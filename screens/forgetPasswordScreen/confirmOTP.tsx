import React from "react";
import { ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { reqConfirmOTPAPI, reqForgetPWAPI } from "../../apis/auth.api";

import { useState } from "react";
const ConfirmOTP = ({ navigation, route }) => {
  const { phone } = route.params;
  const [otp, setOtp] = useState("");
  const handconfirmOTP = async () => {
    const rs = await reqConfirmOTPAPI(phone, otp)
      .then((res) => {
        console.log(res.data);
        navigation.navigate("ResetPassword", {
          phone: phone,
          token: res.data.token,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        Alert.alert(
          "Lỗi",
          "Mã OTP không chính xác",
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
  const handResendOTP = async () => {
    const rs = await reqForgetPWAPI(phone)
      .then((res) => {
        Alert.alert(
          "Thông báo",
          "Mã xác nhận đã được gửi lại",
          [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
              style: "default",
            },
          ],
          { cancelable: false }
        );
      })
      .catch((err) => {
        console.log(err);
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
          Nhập mã OTP
        </Text>
        <TextInput
          label="Mã OTP"
          mode="outlined"
          style={{ marginHorizontal: 10, textAlign: "center" }}
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
          maxLength={6}
        />
        <TouchableOpacity onPress={handResendOTP}>
          <Text style={{ color: "blue", margin: 10 }}>Gửi lại mã xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handconfirmOTP}>
          <Button mode="contained" style={{ margin: 30 }}>
            Xác nhận
          </Button>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default ConfirmOTP;
