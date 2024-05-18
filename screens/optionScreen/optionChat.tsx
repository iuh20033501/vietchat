import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import Header from "../components/headerFind";
import Icon from "react-native-vector-icons/Ionicons";
import { white, backgroundHeader } from "../../assets/colors";
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { Avatar } from "react-native-elements";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getChatDetailApi } from "../../apis/chat.api";
import { useState } from "react";
import { removeFriendApi } from "../../apis/user.api";
const handName = () => {};
const handFile = () => {};
const handAddGroup = () => {};
const handAddUser = () => {};
const handTrash = () => {};


const OptionScreen = ({ navigation, route }) => {
  
  const { item } = route.params;
  console.log("item", item);
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const userID = queryClient.getQueryData(["profile"])["id"];
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const handleRemoveFriend = async () => {
    try {
      const friendId = user.id;
      const res = await removeFriendApi(token, friendId);
      console.log('Xóa kết bạn thành công:', res);
      Alert.alert("Thông báo", res.data);
    } catch (error) {
      console.error('Lỗi khi xóa kết bạn:', error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa kết bạn");
    }
  };
  
  
  const getChatDetail = useQuery({
    queryKey: ["chatDetail", token, item.id],
    queryFn: () =>
      getChatDetailApi(token, item.id)
        .then((res) => {
          const user = res.data.members.filter((user) => user.id !== userID);
          setUser(user[0]);
          return res.data;
        })
        .catch((err) => console.log(err["response"].data.detail)),
  });
  if (getChatDetail.isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerHeader}>
        <Avatar
          size="xlarge"
          rounded
          title="G"
          source={{
            uri: user?.thumbnailAvatar || null,
          }}
        />
        <Text style={{ fontSize: 20 }}>
          {user.firstName + " " + user.lastName}
        </Text>
        <View style={styles.containerIcon}>
          <TouchableOpacity style={{ width: 50, alignItems: "center" }}>
            <View style={styles.icon}>
              <IconSimpleLineIcons name="magnifier" color="black" size={20} />
            </View>
            <Text style={{ textAlign: "center", fontSize: 12 }}>
              Tìm tin nhắn
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 50, alignItems: "center" }}>
            <View style={styles.icon}>
              <IconAntDesign name="user" color="black" size={20} />
            </View>
            <Text style={{ textAlign: "center", fontSize: 12 }}>
              Trang cá nhân
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerList}>
        <TouchableOpacity style={styles.objectList} onPress={handName}>
          <IconSimpleLineIcons name="pencil" color="black" size={25} />
          <Text style={styles.text}>Đổi tên gợi nhớ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.objectList} onPress={handFile}>
          <IconSimpleLineIcons name="picture" color="black" size={25} />
          <Text style={styles.text}>Ảnh, file, link đã gửi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.objectList} onPress={handAddGroup}>
          <IconAntDesign name="addusergroup" color="black" size={25} />
          <Text style={styles.text}>{"Tạo nhóm với " + user.lastName}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.objectList} onPress={handAddUser}>
          <IconAntDesign name="adduser" color="black" size={25} />
          <Text style={styles.text}>
            {"Thêm " + user.lastName + " vào nhóm"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.objectList} onPress={handTrash}>
          <IconSimpleLineIcons name="trash" color="black" size={25} />
          <Text style={styles.text}>{"Xóa lịch sử trò chuyện"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.objectList} onPress={handleRemoveFriend}>
          <IconSimpleLineIcons name="user-unfollow" color="black" size={25} />
          <Text style={styles.text}>Xóa bạn bè</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  img: {
    height: 70,
    width: 70,
    borderRadius: 40,
    marginBottom: 10,
  },
  containerIcon: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    width: "40%",
    marginTop: 20,
  },
  icon: {
    backgroundColor: "#E3E3E3",
    borderRadius: 40,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  containerList: {
    marginTop: 10,
  },
  objectList: {
    backgroundColor: white,
    flexDirection: "row",
    paddingLeft: 5,
    borderBottomColor: "black",
    borderBottomWidth: 0.2,
    height: 60,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default OptionScreen;
