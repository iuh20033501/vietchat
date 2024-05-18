import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign";
import ObjectGroup from "./objectGroup";
import { white } from "../../assets/colors";
import { useState } from "react";
import ChildrenModal from "./childrenModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getListGroupApi } from "../../apis/group.api";

const ListGroupScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const [listGroup, setListGroup] = useState([]);
  const getListGroup = useQuery({
    queryKey: ["getListGroup"],
    queryFn: async () =>
      getListGroupApi(token)
        .then((res) => {
          setListGroup([...res.data]);
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        }),
  });
  return (
    <ScrollView>
      <TouchableOpacity style={styles.object} onPress={()=>setModalVisible(true)}>
        <View style={styles.icon}>
          <Icon name="addusergroup" color="#0382F7" size={30} />
        </View>
        <Text style={{ color: "#0382F7", fontSize: 18 }}>Tạo nhóm mới</Text>
      </TouchableOpacity>
      <View style={{ backgroundColor: white, marginTop: 5 }}>
        <Text style={{ fontSize: 15, marginLeft: 5 }}>
          Nhóm đang tham gia ({listGroup.length})
        </Text>
      </View>
      <ScrollView style={styles.containerListGroup}>
        {listGroup.map((group) => {
          return <ObjectGroup key={group.id} item={group} navigation={navigation} />;
        })}
      </ScrollView>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <ChildrenModal setmodalvisiable={setModalVisible} navigation={navigation}/>
      </Modal>
    </ScrollView>
  );
};

export default ListGroupScreen;
