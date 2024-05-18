import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Alert,
  Image,
} from "react-native";
import { sendChat, white } from "../../assets/colors";
import { useState } from "react";
import { Button } from "react-native-paper";
import { formatTime, formatTimeMess } from "../../utils/format";
import { ResizeMode, Video } from "expo-av";
import ChildrenModalForwadMess from "./modalForwardMess";

const SendChat = ({ item, onDeleteMessage, onUnsentMessage }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleForward, setModalVisibleForward] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handUnsent = () => {
    // không thể thu hồi tin nhắn sau 1 ngày
    if (formatTime(item.createdAt).split(" ")[1] == "ngày") {
      Alert.alert("Không thể thu hồi tin nhắn sau 1 ngày");
      closeModal();
      return;
    }
    onUnsentMessage(item.messageId);
    closeModal();
  };
  const handDelete = () => {
    onDeleteMessage(item.messageId);
    console.log("Delete");
    closeModal();
  };
  return (
    <TouchableOpacity style={styles.chat} onLongPress={openModal}>
      {/* text */}
      {item.content !== "" && (
        <View style={styles.container}>
          <Text
            style={
              item.status == "UNSEND"
                ? { fontSize: 17, marginHorizontal: "3%", color: "#8A8A8A" }
                : { fontSize: 17, marginHorizontal: "3%" }
            }
          >
            {item?.content}
          </Text>
          <Text style={{ marginTop: 5, opacity: 0.3, fontSize: 12 }}>
            {formatTimeMess(item?.createdAt)}
          </Text>
        </View>
      )}

      {/* Hiển thị hình ảnh video nếu không phải unsend */}
      {item.status != "UNSEND" && (
        <>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {!(item.attachments == null) && (
              <>
                {[...item.attachments].map((item) => (
                  <View key={item.url}>
                    {item.type === "IMAGE" ? (
                      <View>
                        <Image
                          source={{ uri: item.url }}
                          style={{
                            width: 200,
                            height: 200,
                          }}
                          resizeMode="contain"
                        />
                      </View>
                    ) : (
                      <TouchableOpacity>
                        <Video
                          source={{ uri: item.url }}
                          style={{ width: 200, height: 200 }}
                          useNativeControls={true}
                          resizeMode={ResizeMode.CONTAIN}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </>
            )}
          </View>
          {item.content === "" && (
            <Text style={{ marginTop: 5, opacity: 0.3, fontSize: 12 }}>
              {formatTimeMess(item?.createdAt)}
            </Text>
          )}
        </>
      )}
      {/* Modal ooption */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContainer}>
          <View
            style={[
              styles.container,
              { borderColor: "black", borderWidth: 1, width: "100%" },
            ]}
          >
            <Text
              style={
                item.status == "UNSEND"
                  ? { fontSize: 17, marginHorizontal: "3%", color: "#8A8A8A" }
                  : { fontSize: 17, marginHorizontal: "3%" }
              }
            >
              {item?.content}
            </Text>
          </View>
          {/* Your modal content here */}
          {item.status == "SENT" ? (
            <TouchableOpacity
              style={{ marginVertical: 5 }}
              onPress={handUnsent}
            >
              <Button>Thu hồi tin nhắn</Button>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity style={{ marginVertical: 5 }} onPress={handDelete}>
            <Button>Xóa tin nhắn</Button>
          </TouchableOpacity>
          {item.status != "UNSEND" && (
            <TouchableOpacity
              style={{ marginVertical: 5 }}
              onPress={() => {
                setModalVisible(false);
                setModalVisibleForward(true);
              }}
            >
              <Button>Chuyển tiếp tin nhắn</Button>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
      {/* forward message */}
      <Modal
        visible={modalVisibleForward}
        animationType="slide"
        transparent={true}
      >
        <ChildrenModalForwadMess
          setModalVisible={setModalVisibleForward}
          item={item}
        />
      </Modal>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "70%",
    backgroundColor: sendChat,
    borderRadius: 8,
    paddingVertical: 12,
  },
  chat: {
    marginVertical: 6,
    alignSelf: "flex-end",
    marginRight: "2%",
    transform: [{ scaleY: -1 }],
  },
  modalContainer: {
    position: "absolute",
    bottom: "10%",
    right: 0,
    width: "70%",
    backgroundColor: white, // Adjust as needed
    borderRadius: 8,
    padding: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
export default SendChat;
