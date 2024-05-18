import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { backgroundHeader } from "../../assets/colors";
import { useQueryClient } from "@tanstack/react-query";
import { connectSocket } from "../../utils/socket";

const Header = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const handLogOut = async () => {
    await queryClient.clear();
    const stompj = await connectSocket();
    await stompj.disconnect();
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" as never }],
    });
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          marginStart: "5%",
        }}
        onPress={() => navigation.navigate("Find" as never)}
      >
        <Icon name="magnifying-glass" color="#ffffff" size={30} />
        <Text
          style={{
            fontSize: 15,
            marginLeft: "10%",
            marginTop: "2%",
            color: "#ffffff",
          }}
        >
          Tìm kiếm
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginEnd: "5%",
        }}
        onPress={handLogOut}
      >
        <Icon name="log-out" color="#ffffff" size={30} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: backgroundHeader,
    flexDirection: "row",
    paddingTop: "12%",
    justifyContent: "space-between",
  },
});
export default Header;
