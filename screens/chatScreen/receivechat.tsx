import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { white } from "../../assets/colors";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { ResizeMode, Video } from "expo-av";
import ChildrenModalForwadMess from "./modalForwardMess";
import { formatTimeMess } from "../../utils/format";

const ReceiveChat = ({ item, isSameUser, onDeleteMessage }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleForward, setModalVisibleForward] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handDelete = () => {
    onDeleteMessage(item.messageId);
    console.log("Delete");
    closeModal();
  };
  return (
    <TouchableOpacity style={styles.chat} onLongPress={openModal}>
      {/* text  */}
      <View style={{ flexDirection: "row" }}>
        {!isSameUser ? (
          <React.Fragment>
            {item.sender.thumbnailAvatar !== null &&
            item.sender.thumbnailAvatar !== "" ? (
              <Image
                style={styles.img}
                source={{
                  uri: item.sender.thumbnailAvatar,
                }}
              />
            ) : (
              <Image
                style={styles.img}
                source={require("../../assets/images/images.jpg")}
              />
            )}
          </React.Fragment>
        ) : (
          <View style={styles.img}></View>
        )}

        {/* text */}
        {item.content !== "" && (
          <View style={[styles.container, { maxWidth: "70%" }]}>
            <Text style={{ marginBottom: 5, opacity: 0.3 }}>
              {item?.sender?.firstName + " " + item?.sender?.lastName}
            </Text>
            <Text
              style={
                item.status == "UNSEND"
                  ? { fontSize: 17, marginHorizontal: "3%", color: "#8A8A8A" }
                  : { fontSize: 17, marginHorizontal: "3%" }
              }
            >
              {item?.content}
            </Text>
            <Text style={{ marginTop: 5, opacity: 0.3, fontSize:12 }}>
              {formatTimeMess(item?.createdAt)}
            </Text>
          </View>
        )}
      </View>

      {/* Hiển thị hình ảnh video nếu không phải unsend */}
      {item.status != "UNSEND" && (
        <>
          {item.content === "" && (
            <Text style={{ marginBottom: 5, opacity: 0.3 }}>
              {item?.sender?.firstName + " " + item?.sender?.lastName}
            </Text>
          )}
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginLeft: "7%" }}
          >
            {!(item.attachments == null) && (
              <>
                {[...item.attachments].map((item) => (
                  <View key={item.url}>
                    {item.type === "IMAGE" ? (
                      <TouchableOpacity>
                        <Image
                          source={{ uri: item.url }}
                          style={{ width: 200, height: 200 }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
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
              { borderWidth: 1, borderColor: "black", width: "100%" },
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
    backgroundColor: white,
    borderRadius: 10,
    paddingVertical: 12,
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 40,
    marginHorizontal: "2%",
  },
  chat: {
    marginVertical: 6,
    transform: [{ scaleY: -1 }],
  },
  modalContainer: {
    position: "absolute",
    bottom: "10%",
    left: 0,
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
export default ReceiveChat;
