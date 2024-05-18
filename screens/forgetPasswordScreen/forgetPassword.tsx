import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { reqForgetPWAPI } from "../../apis/auth.api";
const ForgetPassword = ({navigation}) => {
  const [phone, setPhone] = useState("");
  const handCofirmOTP = async () => {
    const phoneNumberRegex =
      /^(03[2-9]|05[2689]|07[06789]|08[12345]|09[2-9])\d{7}$/;
    if (phoneNumberRegex.test(phone)) {
      const rs = await reqForgetPWAPI(phone);
      if(rs.status === 200){
        navigation.navigate("ConfirmOTP", {phone: phone})
      }else{
        Alert.alert(
            "Lỗi",
            "Số điện thoại không tồn tại",
            [
              {
                text: "OK",
                onPress: () => console.log("OK Pressed"),
                style: "default",
              },
            ],
            { cancelable: false }
          );
      }
      

    }else{
        Alert.alert(
            "Lỗi",
            "Số điện thoại không hợp lệ",
            [
              {
                text: "OK",
                onPress: () => console.log("OK Pressed"),
                style: "default",
              },
            ],
            { cancelable: false }
          );
    }
  };
  return (
    <ScrollView>
      <View>
        <View>
          <Text
            style={{
              fontSize: 20,
              color: "blue",
              alignSelf: "center",
              margin: 20,
            }}
          >
            Quên mật khẩu
          </Text>
        </View>
        <View>
          <Text
            style={{ fontSize: 15, marginBottom: 15, marginHorizontal: 10 }}
          >
            Nhập số điện thoại của bạn
          </Text>
        </View>
        <TextInput
          label="Số điện thoại"
          mode="outlined"
          style={{ marginHorizontal: 10 }}
          keyboardType="number-pad"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          maxLength={10}
        />
        <TouchableOpacity onPress={handCofirmOTP}>
          <Button mode="contained" style={{ margin: 30 }}>
            Gửi mã xác nhận
          </Button>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({});
export default ForgetPassword;
