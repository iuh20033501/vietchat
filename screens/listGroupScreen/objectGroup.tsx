import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { Avatar } from "react-native-elements";

const ObjectGroup = ({ item, navigation }) => {
  const handPress = () => {
    const chatRoom = {
      id : item.chatId,
      name: item.name,
    }
    navigation.navigate("Chat", { chatRoom: chatRoom });
  };

  return (
    <View>
      <TouchableOpacity style={styles.object} onPress={handPress}>
        <Avatar
          rounded={true}
          size={"medium"}
          title={item.name[0]}
          activeOpacity={0.7}
          source={{ uri: item.thumbnailAvatar }}
        />
        <View style={{ width: "65%" }}>
          {/* thay đổi tên  */}
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.name}</Text>
          {/* <Text>tin nhắn cuối</Text> */}
        </View>
        {/* <Text>8 giờ</Text> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  object: {
    height: 80,
    justifyContent: "space-between",
    borderBottomWidth: 0.2,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginHorizontal: "2%",
  },
});
export default ObjectGroup;
