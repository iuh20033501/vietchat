import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign";
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { Avatar } from "react-native-elements";
const Friend = ({ item, navigation }) => {
  const handPress = () => {
    const chatRoom = {
      id : item.chatId,
      name: item.displayName,
    }
    navigation.navigate("Chat", { chatRoom: chatRoom });
  };
  return (
    <View>
      <TouchableOpacity style={styles.object} onPress={handPress}>
        <Avatar
          rounded={true}
          size={"medium"}
          title={item.displayName[0]}
          activeOpacity={0.7}
          source={{uri: item.profile.thumbnailAvatar }}
        />
        <Text style={{ fontSize: 18, flex: 1 }}>{item.displayName}</Text>
        <TouchableOpacity>
          <IconSimpleLineIcons name="phone" color="black" size={25} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            style={{ marginHorizontal: 20 }}
            name="videocamera"
            color="black"
            size={25}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default Friend;
