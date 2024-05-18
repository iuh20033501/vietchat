import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { backgroundHeader, white } from "../../assets/colors";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Friend from "../listGroupScreen/friend";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import IconFeather from "react-native-vector-icons/Feather";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { getListContactApi } from "../../apis/user.api";
import { connectSocket } from "../../utils/socket";
const ChildrenModalForwadMess = ({ setModalVisible, item }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const queryClient = useQueryClient();
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const userID = queryClient.getQueryData(["profile"])["id"];
  useEffect(() => {
    setContacts([
      ...(queryClient.getQueryData(["getListContact", "friend"]) as []),
    ]);
  }, []);

  const handleCheckboxPress = (id, isChecked) => {
    if (isChecked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, id]);
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== id)
      );
    }
  };
  const filteredContacts = contacts.filter((contact) =>
    contact.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedContacts = filteredContacts
    .slice()
    .sort((a, b) => a.displayName.localeCompare(b.displayName));

  const groupedContacts = sortedContacts.reduce((acc, contact) => {
    const initial = contact.displayName[0].toUpperCase();
    if (!acc[initial]) {
      acc[initial] = [];
    }
    acc[initial].push(contact);
    return acc;
  }, {});

  const sections = Object.keys(groupedContacts).map((initial) => ({
    title: initial,
    data: groupedContacts[initial],
  }));
  // handle forward message
  const handleForwardMess = async () => {
    const selectedContacts = contacts.filter((contact) =>
      checkedItems.includes(contact.profile.id)
    );

    try {
      const stompClient = await connectSocket();
      if (stompClient) {
        selectedContacts.forEach(async (contact) => {
          await sendMess(stompClient, contact.chatId);
        });
      } else {
        console.log("Socket connection failed or not established.");
      }
    } catch (error) {
      console.error("Error occurred while handling forward message:", error);
    }
    setModalVisible(false);
  };

  const sendMess = async (stompClient, chatId) => {
    try {
      // Gửi tin nhắn qua socket
      console.log("Sending message to chat:", chatId);
      // console.log("socket", stompClient);
      // await stompClient.connect({}, onConnected(stompClient, chatId), {});
      await stompClient.send(
        "/app/chat/" + chatId,
        {},
        JSON.stringify({
          sender: userID,
          content: item.content,
          attachments: item.attachments,
        })
      );
    } catch (error) {
      console.error("Error occurred while sending message:", error);
    }
  };
  const onConnected = async (stompClient, chatId) => {
    await stompClient.subscribe("/chatroom/" + chatId, {});
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <IconFeather
            name="x"
            color="black"
            size={25}
            onPress={() => setModalVisible(false)}
          />
          <Text style={{ fontSize: 20, marginLeft: 10, flex: 1 }}>
            Nhóm mới
          </Text>
          {checkedItems.length > 0 ? (
            <TouchableOpacity onPress={handleForwardMess} style={styles.button}>
              <IconAntDesign name="arrowright" color="white" size={30} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <View style={{ marginTop: 5 }}>
          <View style={styles.containerFind}>
            <IconMaterialCommunityIcons
              name="magnify"
              color="black"
              size={20}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Tìm kiếm bạn bè"
              placeholderTextColor={"gray"}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
          <SectionList
            sections={sections}
            keyExtractor={(item) => item}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{title}</Text>
              </View>
            )}
            renderItem={({ item }) => (
              <Friend
                item={item}
                isChecked={checkedItems.includes(item.profile.id)}
                onCheckboxPress={handleCheckboxPress}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: white,
    marginBottom: 10,
  },
  icon: {
    borderRadius: 8,
    backgroundColor: backgroundHeader,
    alignSelf: "flex-start",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "3%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: white,
    padding: 16,
    marginTop: "20%",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  sectionHeader: {
    backgroundColor: white,
    padding: 10,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  object: {
    height: 60,
    justifyContent: "flex-start",
    borderBottomWidth: 0.2,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: white,
  },
  img: {
    width: 45,
    height: 45,
    borderRadius: 40,
    marginHorizontal: "2%",
  },
  containerFind: {
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    height: 40,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: "center",
    marginVertical: 10,
  },

  textInput: {
    fontSize: 15,
    flex: 1,
    marginLeft: 10,
  },
  button: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: backgroundHeader,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ChildrenModalForwadMess;
