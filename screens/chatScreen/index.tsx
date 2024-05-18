import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import SendChat from "./sendchat";
import ReceiveChat from "./receivechat";
import InputChat from "./inputChat";
import styles from "./styles";
import HeaderChat from "./header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { decode } from "base64-arraybuffer";
import {
  deleteMessageApi,
  getChatRoomApi,
  getLinkuploadApi,
  unsentMessageApi,
} from "../../apis/chat.api";
import EventChat from "./event";
import { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import http, { ip } from "../../utils/http";
import axios from "axios";
import { connectSocket, disconnectSocket } from "../../utils/socket";
let stompClient = null;

const ChatScreen = ({ navigation, route }) => {
  const { chatRoom } = route.params;
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const userID = queryClient.getQueryData(["profile"])["id"];
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  const getChatRoom = useQuery({
    queryKey: ["chatRoom", chatRoom?.id],
    queryFn: () =>
      getChatRoomApi(token, chatRoom?.id)
        .then((res) => {
          setMessages([...res.data].reverse());
          return res.data;
        })
        .catch((err) => console.log(err["response"])),
  });

  // socket
  const [chat, setChat] = useState({
    chatId: chatRoom?.id,
    content: "",
    sender: userID,
    connected: false,
  });
  useEffect(() => {
    const fetchDataAndConnect = async () => {
      try {
        console.log("connectSocket", "connectSocket");
        console.log("stompClient", stompClient);
        if (stompClient == null) {
          stompClient = await connectSocket();

          try {
            await stompClient.connect({}, async () => {
              console.log("connect", "connect");
              await stompClient.subscribe(
                "/chatroom/" + chat?.chatId,
                onPrivateMessageReceived
              );
            });
          } catch (error) {
            throw new Error("Socket connection error");
          }
        }
      } catch (error) {
        console.error("Socket connection error:", error);
      }
      await queryClient.invalidateQueries({
        queryKey: ["chatRoom", chatRoom.id],
      });
    };
    console.log("fetchDataAndConnect", "fetchDataAndConnect");
    fetchDataAndConnect();

    return () => {
      if (stompClient) {
        disconnectSocket();
        stompClient = null;
        setChat({ ...chat, connected: false });
      }
    };
  }, []);

  const onPrivateMessageReceived = async (payload) => {
    console.log("onPrivateMessageReceived", "payload");
    const data = (await JSON.parse(payload.body)) as any;
    console.log("onPrivateMessageReceived", data);
    setMessages((prevMessages) => {
      const messageIndex = prevMessages.findIndex(
        (message) => message.messageId === data.messageId
      );

      if (messageIndex !== -1) {
        const updatedMessages = [...prevMessages];
        updatedMessages[messageIndex] = data;
        return updatedMessages;
      } else {
        return [data, ...prevMessages];
      }
    });
  };
  const handleSendMessage = async (message, media) => {
    const attachments = [];
    await Promise.all(
      media.map(async (item) => {
        const res = await getLinkuploadApi(token, {
          filename: item?.fileName,
          type: "MESSAGE",
        });
        const arrayBuffer = await decode(item.base64);
        const resUpload = await axios
          .put(res.data, arrayBuffer)
          .then(async (res2) => {
            const newUrl = res.data.substring(0, res.data.indexOf("?"));
            attachments.push({
              type: item.type.toUpperCase(),
              url: newUrl,
              filename: newUrl.split("/")[newUrl.split("/").length - 1],
            });
          })
          .catch((e) => console.log(e));
      })
    );
    await setChat({ ...chat, content: message });
    stompClient.send(
      "/app/chat/" + chat.chatId,
      {},
      JSON.stringify({ sender: chat.sender, content: message, attachments })
    );
  };

  const handleDeleteMessage = async (messageId) => {
    // console.log("delete message", chat.connected);
    const res = await deleteMessageApi(token, chatRoom.id, messageId);
    if (res.status != 200) {
      Alert.alert("Error", res.data.detail);
      return;
    }
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.messageId !== messageId)
    );
  };
  const handleUnsentMessage = async (messageId) => {
    const res = await unsentMessageApi(token, chatRoom.id, messageId);
    // if (res.status === 200) {
    //   setMessages((prevMessages) => {
    //     // Find the index of the message with the given messageId
    //     const messageIndex = prevMessages.findIndex(
    //       (message) => message.messageId === messageId
    //     );

    //     // If the message with the given messageId is found, update it
    //     if (messageIndex !== -1) {
    //       const updatedMessages = [...prevMessages];
    //       updatedMessages[messageIndex] = res.data;
    //       return updatedMessages;
    //     } else {
    //       // If the message with the given messageId is not found, add it to the end of the array
    //       return [...prevMessages, res.data];
    //     }
    //   });
    // }
  };
  //
  if (getChatRoom.isLoading)
    return <ActivityIndicator size="large" color="#0000ff" />;
  else {
    // console.log(messages);
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={2}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <HeaderChat item={chatRoom} navigation={navigation} />
      </View>

      <ScrollView style={styles.bodyChat}>
        {messages.map((item, index) => {
          if (item.type == "EVENT") {
            return <EventChat key={item.messageId} item={item} />;
          } else {
            if (item.sender.id == userID) {
              return (
                <SendChat
                  key={item.messageId}
                  item={item}
                  onDeleteMessage={handleDeleteMessage}
                  onUnsentMessage={handleUnsentMessage}
                />
              );
            } else {
              if (item.sender.id == messages[index + 1]?.sender.id)
                return (
                  <ReceiveChat
                    key={item.messageId}
                    item={item}
                    isSameUser={true} // không hiển thị avatar
                    onDeleteMessage={handleDeleteMessage}
                  />
                );
              else
                return (
                  <ReceiveChat
                    key={item.messageId}
                    item={item}
                    isSameUser={false} // hiển thị avatar
                    onDeleteMessage={handleDeleteMessage}
                  />
                );
            }
          }
        })}
      </ScrollView>
      <View>
        <InputChat onSendMessage={handleSendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
