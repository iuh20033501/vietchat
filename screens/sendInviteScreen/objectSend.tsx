import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar } from "react-native-elements";

const handInfo = () => {};

const ObjectSend = ({ data, handleCancel }) => {
  return (
    <TouchableWithoutFeedback onPress={handInfo}>
      <View style={styles.object}>
        <Avatar
          rounded={true}
          size={"medium"}
          title={data.displayName[0]}
          activeOpacity={0.7}
          source={{ uri: data.profile.thumbnailAvatar }}
        />
        <Text style={{ fontSize: 18, flex: 1 }}>{data.displayName}</Text>
        <TouchableOpacity
        onPress={()=>handleCancel(data.profile.id)}
          style={[
            styles.button,
            { backgroundColor: "#E0E0E0", marginRight: 10 },
          ]}
        >
          <Text style={[styles.text]}>Thu hồi</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  object: {
    height: 80,
    justifyContent: "flex-start",
    borderBottomWidth: 0.2,
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 45,
    height: 45,
    borderRadius: 40,
    marginHorizontal: "2%",
  },
  button: {
    width: "20%",
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    marginTop: 10,
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
  },
});
export default ObjectSend;
