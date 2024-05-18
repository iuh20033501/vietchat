import React from "react";
import { ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { reqResetPWAPI } from "../../apis/auth.api";
const ResetPassword = ({ navigation, route }) => {
  const {token } = route.params;
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isSecure, setSecure] = useState(true);
  const handConfirm = async () => {
    if (password !== rePassword) {
      Alert.alert(
        "Lỗi",
        "Mật khẩu không khớp",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
            style: "default",
          },
        ],
        { cancelable: false }
      );
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      console.log(password)
      console.log(passwordRegex.test(password))
    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Lỗi",
        "Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 số và 1 ký tự đặc biệt @$!%*?&",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
            style: "default",
          },
        ],
        { cancelable: false }
      );
      return;
    }
    const rs = await reqResetPWAPI(password, token).then((res) => {
      Alert.alert(
        "Thành công",
        "Đặt lại mật khẩu thành công",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              }),
            style: "default",
          },
        ],
        { cancelable: false }
      );
    }).catch((err) => {
      Alert.alert(
        "Lỗi",
        "Đặt lại mật khẩu không thành công",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
            style: "default",
          },
        ],
        { cancelable: false }
      );
    });
  };

  return (
    <ScrollView>
      <View>
        <Text
          style={{
            fontSize: 20,
            color: "blue",
            alignSelf: "center",
            margin: 20,
          }}
        >
          Đặt lại mật khẩu
        </Text>
        <TextInput
          label="Mật khẩu mới"
          mode="outlined"
          style={{ marginHorizontal: 10 }}
          secureTextEntry={isSecure}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
        <TextInput
          label="Nhập lại mật khẩu"
          mode="outlined"
          style={{ marginHorizontal: 10, marginVertical: 10 }}
          secureTextEntry={isSecure}
          value={rePassword}
          onChangeText={(rePassword) => setRePassword(rePassword)}
        />
        <TouchableOpacity onPress={() => setSecure(!isSecure)}>
          <Text style={{ color: "blue", margin: 10 }}>
            {isSecure ? "Hiện " : "Ẩn "}mật khẩu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handConfirm}>
          <Button mode="contained" style={{ margin: 30 }}>
            Xác nhận
          </Button>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default ResetPassword;
