import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar } from "react-native-elements";
import { formatTime } from "../../utils/format";

// lời mời kết bạn
const ObjectReceive = ({ data, handleSubmit, handleReject }) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.object}>
        <Avatar
          rounded={true}
          size={"medium"}
          title={data.displayName[0]}
          activeOpacity={0.7}
          source={{ uri: data.profile.thumbnailAvatar }}
        />
        <View style={styles.boxText}>
          {/* thay đổi tên  */}
          <Text style={styles.text}>{data.displayName}</Text>
          <Text style={{ color: "gray" }}>{`${formatTime(data.profile.createdAt)} trước | Muốn kết bạn`}</Text>
          {/* <Text style={[styles.text, styles.box]}>
            {data.title + "aaaaaaaaaaaaa"}
          </Text> */}
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <TouchableOpacity
            onPress={ async() => await handleReject(data.profile.id)}
              style={[styles.button, { backgroundColor: "#E0E0E0" }]}
            >
              <Text style={styles.text}>Từ chối</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={ async () => await handleSubmit(data.profile.id)}
              style={[styles.button, { backgroundColor: "#E9F6FF" }]}
            >
              <Text style={[styles.text, { color: "#1187F1" }]}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  object: {
    justifyContent: "flex-start",
    borderBottomWidth: 0.2,
    flexDirection: "row",
    paddingBottom: 8,
  },
  img: {
    width: 45,
    height: 45,
    borderRadius: 40,
    marginHorizontal: "2%",
  },
  boxText: {
    flex: 1,
    marginRight: 20,
  },
  text: {
    fontSize: 18,
  },
  box: {
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 5,
    borderRadius: 10,
    marginTop: 10,
    height: 45,
    textAlignVertical: "center",
  },
  button: {
    width: "40%",
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    marginTop: 10,
    borderRadius: 20,
  },
});
export default ObjectReceive;
