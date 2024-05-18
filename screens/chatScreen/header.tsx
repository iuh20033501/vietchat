import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import IconFoundation from "react-native-vector-icons/Foundation";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const HearderChat = ({ navigation, item }) => {
  const backNavigation = () => {
    navigation.goBack();
  };
  
  const handOption = () => {
    console.log("item", item);
    item?.isGroup
      ? navigation.navigate("OptionChatGroup", { item: item })
      : navigation.navigate("OptionChat", { item: item });
  };
  return (
    <View
      style={[
        styles.rowContainer,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Icon name="left" color="#ffffff" size={30} onPress={backNavigation} />
      <Text style={[styles.headerText, { width: "57%" }]}>{item?.name||''}</Text>
      <TouchableOpacity style={{ marginHorizontal: 10 }}>
        <IconSimpleLineIcons name="phone" color="#ffffff" size={20} />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginHorizontal: 10 }}>
        <Icon name="videocamera" color="#ffffff" size={20} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handOption} style={{ marginHorizontal: 10 }}>
        <IconFoundation name="list-bullet" color="#ffffff" size={20} />
      </TouchableOpacity>
    </View>
  );
};
export default HearderChat;
