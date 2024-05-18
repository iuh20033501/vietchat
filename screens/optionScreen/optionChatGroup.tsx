import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import Header from "../components/headerFind";
import Icon from "react-native-vector-icons/Ionicons";
import { white, backgroundHeader } from "../../assets/colors";
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { Avatar } from "react-native-elements";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import IconFeather from "react-native-vector-icons/Feather";
import {
  addMemberToGroupApi,
  deleteMemberInGroupApi,
  getGroupInfoApi,
  getListMemberInGroupApi,
  updateGroupApi,
  leaveChatGroupApi
} from "../../apis/group.api";
import { useCallback, useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { sendFriendRequestApi } from "../../apis/user.api";
import { CheckBox } from "@rneui/themed";
import { useFocusEffect } from "@react-navigation/native";
const OptionChatGroup = ({ route }) => {
  const { item } = route.params;
  const id = item.groupId;
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const userID = queryClient.getQueryData(["profile"])["id"];
  const [listMember, setListMember] = useState([]);
  const [role, setRole] = useState("");
  // const [infoGroup, setInfoGroup] = useState(null);
  const [listContact, setListContact] = useState([]); // contact chưa lọc
  const [image, setImage] = useState(null);
  const [modalInfo, setModalInfo] = useState(false);
  const [modalListMember, setModalListMember] = useState(false);
  const [modalAddUser, setModalAddUser] = useState(false);
  const [modalRemoveUser, setModalRemoveUser] = useState(false);
  // State để lưu trữ trạng thái kiểm tra của từng thành viên
  const [checkedItems, setCheckedItems] = useState({});

  // Hàm xử lý sự kiện khi checkbox được thay đổi
  const handleCheckChange = (id) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const [contacts, setContacts] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Hàm để lọc danh sách thành viên dựa trên giá trị tìm kiếm
  const filteredContacts = contacts.filter((item) => {
    if (!searchText.trim()) return true;
    const fullName =
      `${item.profile.firstName} ${item.profile.lastName}`.toLowerCase();
    return fullName.includes(searchText.toLowerCase());
  });
  const getGroupInfo = useQuery({
    queryKey: ["group", id],
    queryFn: () =>
      getGroupInfoApi(token, id)
        .then((res) => {
          // setInfoGroup({
          //   name: res.data.name,
          //   thumbnailAvatar: res.data.thumbnailAvatar,
          // });
          setImage({ uri: res.data.thumbnailAvatar });
          return res.data;
        })
        .catch((err) => console.log(err)),
  });

  const getlistMember = useQuery({
    queryKey: ["listMember", id],
    queryFn: () =>
      getListMemberInGroupApi(token, id)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err)),
  });
  useEffect(() => {
    const fetchListMember = async () => {
      await getlistMember.refetch();
    };
    fetchListMember();
  }, []);

  useEffect(() => {
    if (getlistMember.data) {
      const userRole = getlistMember.data.find(
        (item) => item.profile.id === userID
      )?.role;
      if (userRole) {
        setRole(userRole);
      }

      const listContact =
        (queryClient.getQueryData(["getListContact", "friend"]) as any) || [];

      // Lọc contact không có trong getlistMember.data
      const filteredContact = listContact.filter((contactItem) => {
        return !getlistMember.data.some(
          (member) => member.profile.id === contactItem.profile.id
        );
      });
      setListContact(
        queryClient.getQueryData(["getListContact", "friend"]) as any
      );
      setListMember(getlistMember.data);
      setContacts(filteredContact);
    }
  }, [getlistMember.data]);
  if (getGroupInfo.isLoading || getlistMember.isLoading)
    return <Text>Loading...</Text>;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };
  const handleInfo = async () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn thay đổi không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: async () => {
            const infoGroup = {
              name: getGroupInfo.data.name,
              thumbnailAvatar: image?.uri,
            };

            await updateGroupApi(token, id, infoGroup);
            await queryClient.invalidateQueries({ queryKey: ["group", id] });
            setModalInfo(false);
          },
        },
      ],
      { cancelable: true }
    );
  };
  const handleFile = () => {};
  const handleListMember = () => {};
  const handleAddUser = async () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn thêm thành viên vào nhóm không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: async () => {
            const listAddUser = Object.keys(checkedItems).filter(
              (key) => checkedItems[key]
            );
            await addMemberToGroupApi(token, id, listAddUser)
              .then((res) => {
                alert("Thêm thành viên thành công");
              })
              .catch((err) => {
                alert(err.response.data.detail);
              });

            await queryClient.invalidateQueries({
              queryKey: ["listMember", id],
            });
            setModalAddUser(false);
          },
        },
      ],
      { cancelable: true }
    );
  };
  const handleRemoveUser = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xóa thành viên khỏi nhóm không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: async () => {
            const listRemoveUser =  Object.keys(checkedItems).filter(
              (key) => checkedItems[key]
            );
            listRemoveUser.forEach(async (item) => {
              await deleteMemberInGroupApi(token, id, item).catch((err) => {
                alert(err.response.data.detail);
              });
            });

            await queryClient.invalidateQueries({
              queryKey: ["listMember", id],
            });
            setModalRemoveUser(false);
          },
        },
      ],
      { cancelable: true }
    );
  };
  const handleDeleteGroup = () => {};
  const handleOutGroup =  async() => {
    // Alert.alert(
    //   "Xác nhận",
    //   "Bạn có chắc chắn muốn rời khỏi nhóm không?",
    //   [
    //     {
    //       text: "Hủy",
    //       style: "cancel",
    //     },
    //     {
    //       text: "Đồng ý",
    //       onPress: async () => {
    //         try {
    //           await leaveChatGroupApi(token, id); // Assuming you have a leaveGroupApi function similar to deleteMemberInGroupApi
              
    //           await queryClient.invalidateQueries({
    //             queryKey: ["listMember", id],
    //           });
    //         } catch (err) {
    //           alert(err.response.data.detail);
    //         }
    //       },
    //     },
    //   ],
    //   { cancelable: true }
    // );
    try {
                await leaveChatGroupApi(token, id); // Assuming you have a leaveGroupApi function similar to deleteMemberInGroupApi 
                // await queryClient.invalidateQueries({
                //   queryKey: ["listMember", id],
                // });
              } catch (err) {
                alert(err.response.data.detail);
                console.log(token)
                console.log(err)
              }
  };
  const handSendAddFriend = async (friendid) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có muốn gửi lời mời kết bạn không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: async () => {
            await sendFriendRequestApi(token, friendid)
              .then((res) => {
                Alert.alert("Thành công", res.data);
                return res.data;
              })
              .catch((err) => {
                alert(err.response.data.detail);
              });
            await queryClient.invalidateQueries({
              queryKey: ["getListContact", "sent"],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerHeader}>
        <Avatar
          size="xlarge"
          rounded
          title={getGroupInfo.data.name[0]}
          source={{ uri: getGroupInfo.data.thumbnailAvatar }}
        ></Avatar>
        <Text style={{ fontSize: 20 }}>{getGroupInfo.data.name}</Text>
        <View style={styles.containerIcon}>
          <TouchableOpacity style={{ width: 50, alignItems: "center" }}>
            <View style={styles.icon}>
              <IconSimpleLineIcons name="magnifier" color="black" size={20} />
            </View>
            <Text style={{ textAlign: "center", fontSize: 12 }}>
              Tìm tin nhắn
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerList}>
        <TouchableOpacity
          style={styles.objectList}
          onPress={() => setModalInfo(true)}
        >
          <IconSimpleLineIcons name="pencil" color="black" size={25} />
          <Text style={styles.text}>Đổi thông tin nhóm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.objectList} onPress={handleFile}>
          <IconSimpleLineIcons name="picture" color="black" size={25} />
          <Text style={styles.text}>Ảnh, file, link đã gửi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.objectList}
          onPress={() => setModalListMember(true)}
        >
          <IconAntDesign name="addusergroup" color="black" size={25} />
          <Text style={styles.text}>{"Xem thành viên nhóm"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.objectList}
          onPress={() => {
            setCheckedItems({});
            setModalAddUser(true)
          }}
        >
          <IconAntDesign name="adduser" color="black" size={25} />
          <Text style={styles.text}>{"Thêm thành viên vào nhóm"}</Text>
        </TouchableOpacity>

        {role === "GROUP_LEADER" || role === "DEPUTY_GROUP_LEADER" ? (
          <>
            <TouchableOpacity
              style={styles.objectList}
              onPress={() => {
                setCheckedItems({});
                setModalRemoveUser(true)
              }}
            >
              <IconAntDesign name="adduser" color="black" size={25} />
              <Text style={styles.text}>{"Xóa thành viên khỏi nhóm"}</Text>
            </TouchableOpacity>
            {role === "GROUP_LEADER" ? (
              <TouchableOpacity
                style={styles.objectList}
                onPress={handleDeleteGroup}
              >
                <IconSimpleLineIcons name="trash" color="black" size={25} />
                <Text style={styles.text}>{"Giải tán nhóm"}</Text>
              </TouchableOpacity>
            ) : null}
          </>
        ) : null}
        <TouchableOpacity style={styles.objectList} onPress={handleOutGroup}>
          <IconSimpleLineIcons name="trash" color="black" size={25} />
          <Text style={styles.text}>{"Rời nhóm"}</Text>
        </TouchableOpacity>
      </View>
      {/* modal doi thongg tin nhom */}
      <Modal visible={modalInfo} transparent={true} animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              margin: 20,
              padding: 10,
              height: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={pickImage}>
              <Avatar
                size="xlarge"
                rounded
                title={getGroupInfo.data.name[0]}
                source={{ uri: image?.uri }}
              ></Avatar>
            </TouchableOpacity>
            <TextInput
              label="Tên nhóm"
              value={getGroupInfo.data.name}
              // onChangeText={(text) =>
              //   setInfoGroup({ ...infoGroup, name: text })
              // }
            ></TextInput>
            <View style={{ margin: 5, justifyContent: "space-between" }}>
              <Button
                mode="contained"
                style={{ backgroundColor: "green" }}
                onPress={handleInfo}
              >
                Thay đổi
              </Button>
              <Button
                mode="contained"
                style={{ backgroundColor: "red" }}
                onPress={() => setModalInfo(false)}
              >
                Hủy
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal list member */}
      <Modal visible={modalListMember} transparent={true} animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              marginTop: 50,
              justifyContent: "center",
              backgroundColor: "white",
              flex: 1,
              padding: 10,
              paddingBottom: 20,
            }}
          >
            <IconFeather
              name="x"
              color="black"
              size={25}
              onPress={() => setModalListMember(false)}
            />
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              Danh sách thành viên
            </Text>
            <ScrollView>
              {listMember.map((item) => (
                <TouchableOpacity
                  key={item.profile.id}
                  style={styles.object}
                  // onpress chuyển đến trang thông tin cá nhân
                >
                  <Avatar
                    size="medium"
                    rounded
                    title={item.profile.lastName[0]}
                    source={{ uri: item.profile.thumbnailAvatar }}
                  />
                  <View style={{ marginLeft: 10, flex: 1 }}>
                    {/* thay đổi tên  */}
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                      {item.profile.firstName + " " + item.profile.lastName}
                    </Text>
                    <Text style={{ fontSize: 12 }}>
                      {item.role === "GROUP_LEADER"
                        ? "Nhóm trưởng"
                        : item.role === "DEPUTY_GROUP_LEADER"
                        ? "Nhóm phó"
                        : "Thành viên"}
                    </Text>
                  </View>
                  {!listContact.some(
                    (contact) => contact.profile.id === item.profile.id
                  ) &&
                    item.profile.id !== userID && (
                      <TouchableOpacity
                        style={{ marginRight: 5 }}
                        onPress={() => handSendAddFriend(item.profile.id)}
                      >
                        <IconAntDesign name="adduser" color="black" size={25} />
                      </TouchableOpacity>
                    )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal thêm thành viên */}
      <Modal visible={modalAddUser} transparent={true} animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              marginTop: 50,
              justifyContent: "center",
              backgroundColor: "white",
              flex: 1,
              padding: 10,
              paddingBottom: 20,
            }}
          >
            <IconFeather
              name="x"
              color="black"
              size={25}
              onPress={() => setModalAddUser(false)}
            />
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              Danh sách bạn bè
            </Text>
            <TextInput
              placeholder="Tìm kiếm"
              mode="outlined"
              style={{ backgroundColor: "white" }}
              value={searchText}
              onChangeText={setSearchText}
            />
            <ScrollView>
              {filteredContacts.map((item) => (
                <TouchableOpacity
                  key={item.profile.id}
                  style={styles.object}
                  onPress={() => handleCheckChange(item.profile.id)}
                  // onpress chuyển đến trang thông tin cá nhân
                >
                  <CheckBox
                    checked={!!checkedItems[item.profile.id]}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                  />
                  <Avatar
                    size="xlarge"
                    rounded
                    title={item.profile.lastName[0]}
                    source={{ uri: item.profile.thumbnailAvatar }}
                  />
                  <View style={{ marginLeft: 10 }}>
                    {/* thay đổi tên  */}
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                      {item.profile.firstName + " " + item.profile.lastName}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button
              mode="contained"
              style={{ backgroundColor: "green" }}
              onPress={handleAddUser}
            >
              Thêm vào nhóm
            </Button>
          </View>
        </View>
      </Modal>
      {/* Modal xóa thành viên */}
      <Modal visible={modalRemoveUser} transparent={true} animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              marginTop: 50,
              justifyContent: "center",
              backgroundColor: "white",
              flex: 1,
              padding: 10,
              paddingBottom: 20,
            }}
          >
            <IconFeather
              name="x"
              color="black"
              size={25}
              onPress={() => setModalRemoveUser(false)}
            />
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              Danh sách thành viên
            </Text>
            <TextInput
              placeholder="Tìm kiếm"
              mode="outlined"
              style={{ backgroundColor: "white" }}
              value={searchText}
              onChangeText={setSearchText}
            />
            <ScrollView>
              {listMember
                .filter((item) => {
                  // Filter based on the search text
                  const fullName =
                    `${item.profile.firstName} ${item.profile.lastName}`.toLowerCase();
                  return fullName.includes(searchText.toLowerCase()) && item.role === "MEMBER";
                })
                .map((item) => (
                  <TouchableOpacity
                    key={item.profile.id}
                    style={styles.object}
                    onPress={() => handleCheckChange(item.profile.id)}
                    // onpress chuyển đến trang thông tin cá nhân
                  >
                    <CheckBox
                      checked={!!checkedItems[item.profile.id]}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                    />
                    <Avatar
                      size="medium"
                      rounded
                      title={item.profile.lastName[0]}
                      source={{ uri: item.profile.thumbnailAvatar }}
                    />
                    <View style={{ marginLeft: 10 }}>
                      {/* thay đổi tên  */}
                      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                        {item.profile.firstName + " " + item.profile.lastName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </ScrollView>
            <Button
              mode="contained"
              style={{ backgroundColor: "green" }}
              onPress={handleRemoveUser}
            >
              Xóa thành viên khỏi nhóm
            </Button>
          </View>
        </View>
      </Modal>
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
  object: {
    height: 80,
    borderBottomWidth: 0.2,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default OptionChatGroup;
