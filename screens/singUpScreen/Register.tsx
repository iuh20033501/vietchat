import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ArrowIcon from "../../assets/icon/ArrowIcon";
import DateTimePicker from "@react-native-community/datetimepicker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import http from "../../utils/http";
import { RadioButton } from "react-native-paper";
import { loginAPI, registerAPI } from "../../apis/auth.api";
import { useQueryClient } from "@tanstack/react-query";
const Register = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState(true);
  const [click, setClick] = useState(false);
  const [failureModalVisible, setFailureModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const { accessToken } = route.params;
  const queryClient = useQueryClient();
  const phone = queryClient.getQueryData(["phoneLogin"]);
  // const accessToken = "1234";

  // const { accessToken } = useState('1234');
  const clickMouse = () => {
    if (click === false) setClick(true);
    else setClick(false);
  };

  const handleRegister = async () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
    if (firstName === "" || lastName === "" || password === "") {
      Alert.alert(
        "Lỗi",
        "Họ và tên không được để trống",
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
    if (birthday.getUTCFullYear() > new Date().getUTCFullYear() - 18) {
      Alert.alert(
        "Lỗi",
        "Bạn chưa đủ 18 tuổi",
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

    const formattedDate = `${birthday.getDate().toString().padStart(2, "0")}-${(
      birthday.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${birthday.getFullYear()}`;
    const rs = await registerAPI(
      firstName,
      lastName,
      gender,
      formattedDate,
      password,
      accessToken
    )
      .then((res) => {
        Alert.alert(
          "Thành công",
          "Đăng ký thành công, quay lại trang đăng nhập để đăng nhập",
          [
            {
              text: "OK",
              onPress: async () => {
                const phone = await loginAPI(firstName, password).then(
                  (res) => {
                    queryClient.setQueryData(["dataLogin"], res.data);

                    navigation.reset({
                      index: 0,
                      routes: [{ name: "TabChat" }],
                    });
                  }
                ).catch((err) => {
                  Alert.alert("Thông báo", "Đăng nhập thất bại, vui lòng thử lại");
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Home" }],
                  });
                });
                
              },
              style: "default",
            },
          ],
          { cancelable: false }
        );
      })
      .catch((err) => {
        setFailureModalVisible(true);
      });
  };
  const handleCloseModal = () => {
    setFailureModalVisible(false);
    setSuccessModalVisible(false);
  };
  return (
    <ScrollView style={styles.container}>
      {failureModalVisible && (
        <TouchableWithoutFeedback onPress={() => handleCloseModal()}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      {successModalVisible && (
        <TouchableWithoutFeedback onPress={() => handleCloseModal()}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Authentication")}>
          <ArrowIcon width={30} height={30} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.font}>Thông tin cá nhân</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Họ của bạn"
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
        <Text
          style={{ fontSize: 10, color: "red", marginTop: 2, marginLeft: 5 }}
        >
          Họ là bắt buộc, không được rỗng
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tên của bạn"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <Text
          style={{ fontSize: 10, color: "red", marginTop: 2, marginLeft: 5 }}
        >
          Tên là bắt buộc, không được rỗng
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Text
          style={{ fontSize: 10, color: "red", marginTop: 2, marginLeft: 5 }}
        >
          Mật khẩu từ 8 - 32 ký tự gồm tối thiểu 1 chữ cái viết hoa, 1 chữ cái
          viết thường, 1 chữ số và 1 ký tự đặc biệt
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          zIndex: 50,
          height: 40,
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Text style={{ textAlign: "center", marginTop: 4 }}>
          Chọn ngày sinh:
        </Text>
        <TouchableOpacity
          style={{ marginLeft: 20, width: 230 }}
          onPress={clickMouse}
        >
          <DateTimePicker
            value={birthday}
            mode="date"
            display="compact"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || birthday;
              setBirthday(currentDate);
            }}
            maximumDate={new Date()}
            minimumDate={new Date(1940, 0, 1)}
            timeZoneName="Asia/Bangkok"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text>Chọn giới tính :</Text>
        <RadioButton.Group
          onValueChange={(newValue) =>
            setGender(newValue === "true" ? true : false)
          }
          value={gender + ""}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 10,
                margin: 10,
              }}
            >
              <RadioButton value="true" />
            </View>
            <Text>Nam</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 10,
                margin: 10,
              }}
            >
              <RadioButton value="false" />
            </View>
            <Text>Nữ</Text>
          </View>
        </RadioButton.Group>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>

      {/* SUCCESS REGISTER */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => handleCloseModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent2}>
            <Text
              style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}
            >
              Đăng ký thành công
            </Text>
            <View style={styles.separator} />
            <Text>• Bây giờ bạn có thể đăng nhập và sử dụng dịch vụ</Text>
            <Text>• Chúc bạn sử dụng dịch vụ vui vẻ</Text>
            <TouchableOpacity
              onPress={() => {
                handleCloseModal();
              }}
            >
              <Text
                style={{
                  color: "#0867ef",
                  textAlign: "center",
                  fontSize: 15,
                  marginTop: 15,
                }}
              >
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* FAIL REGISTER */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={failureModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent2}>
            <Text
              style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}
            >
              Đăng ký thất bại
            </Text>
            <View style={styles.separator} />
            <Text style={{ fontSize: 13 }}>
              Có thể bạn đã gặp phải một số trường hợp:
            </Text>

            <Text>• Tuân thủ các quy địch đặt tên, mật khẩu và ngày sinh</Text>
            <Text>• Kiểm tra kết nối mạng</Text>
            <TouchableOpacity onPress={() => handleCloseModal()}>
              <Text
                style={{
                  color: "#0867ef",
                  textAlign: "center",
                  fontSize: 15,
                  marginTop: 15,
                }}
              >
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  font: {
    fontSize: 28,
    color: "#1a1a1a",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    // marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  picker: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#1c70be",
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent2: {
    width: 250,
    height: 240,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
  },
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: "black",
    marginVertical: 10,
    marginTop: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
});

export default Register;
