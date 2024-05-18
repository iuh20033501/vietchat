import { View, StyleSheet, Text } from "react-native";
import { sendChat, white } from "../../assets/colors";

const EventChat = ({ item }) => {
  return (
    <View style={styles.chat}>
      <View style={styles.container}>
        <Text style={{ fontSize: 17, textAlign:"center" }}>{item.content}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#26CCC5",
    borderRadius: 10,
    width: "70%",
  },
  chat: {
    flexDirection: "row",
    marginVertical: 20,
    alignSelf: "center",
    transform: [{ scaleY: -1 }],
  },
});
export default EventChat;
