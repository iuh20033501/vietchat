import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import ArrowIcon from "../../assets/icon/ArrowIcon";
import PhoneInput from "react-native-phone-input";
import { Checkbox } from "react-native-paper";
import http from "../../utils/http";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

const RegisterForm = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failureModalVisible, setFailureModalVisible] = useState(false);
  
  const handleVerifyCode = () => {
    setModalVisible(false);
    setIsOverlayVisible(false);
  };

  const rollback = () => {
    setModalVisible(false);
    setIsOverlayVisible(false);
  };

  useEffect(() => {
    setIsContinueEnabled(isChecked && isChecked2);
  }, [isChecked, isChecked2]);

  const onPressTerms = () => {};

  const handleCloseModal = () => {
    setSuccessModalVisible(false);
    setFailureModalVisible(false);
  };

  const handleSubmit = async () => {
    if (!phoneNumber) {
      Alert.alert("Thông báo", "Vui lòng nhập số điện thoại.");
      return;
    }

    await http
      .post("/v1/verification/otp/sms/send", {
        headers: {
          "Content-Type": "application/json",
        },
        phone: phoneNumber,
      })
      .then((response) => {
       
        return response;
      })
      .then((data) => {
        console.log(data);
        setSuccessModalVisible(true);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        Alert.alert("Thông báo", "Có lỗi xảy ra khi gửi yêu cầu OTP.");
        setFailureModalVisible(true);
      });
  };

  return (
    <View style={styles.container}>
      {isOverlayVisible && (
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
            setIsOverlayVisible(false);
          }}
        >
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
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
      {/* 
      <View style={{ marginLeft: 5 }}>
        <ArrowIcon width={40} height={40} color="#1a1a1a" />
      </View> */}

      <View>
        <Text style={styles.font}>Nhập số điện thoại</Text>
      </View>

      <View style={styles.phoneInputContainer}>
        <PhoneInput
          initialValue={"+84"}
          // defaultCountry={'VN'}
          onChangePhoneNumber={(number) => {
            const sanitizedNumber = number.replace(/[^0-9]/g, "");
            const formattedNumber = sanitizedNumber.replace(/^84/, "0");
            setPhoneNumber(formattedNumber);
          }}
          textStyle={{
            fontSize: 25,
            color: "#1a1a1a",
            height: 50,
            letterSpacing: 2,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
          }}
          style={{
            height: 80,
            width: 300,
            borderRadius: 1,
            borderBlockColor: "#1c70be",
            alignItems: "center",
          }}
          textProps={{ maxLength: 12 }}
          flagStyle={{ width: 25, height: 20 }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          marginLeft: 50,
          alignItems: "center",
        }}
      >
        <View
          style={{ borderColor: "black", borderWidth: 1, borderRadius: 10 }}
        >
          <Checkbox
            onPress={() => setIsChecked(!isChecked)}
            status={isChecked ? "checked" : "unchecked"}
          />
        </View>
        <View>
          <Text style={{ color: "#1a1a1a", marginTop: -2 }}>
            {" "}
            Tôi đồng ý với các
          </Text>
        </View>
        <TouchableOpacity onPress={onPressTerms}>
          <Text style={{ color: "#1c70be", marginTop: -2 }}>
            {" "}
            điều khoản sử dụng Zalo
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          marginLeft: 50,
          alignItems: "center",
        }}
      >
        <View
          style={{ borderColor: "black", borderWidth: 1, borderRadius: 10 }}
        >
          <Checkbox
            onPress={() => setIsChecked2(!isChecked2)}
            status={isChecked2 ? "checked" : "unchecked"}
          />
        </View>

        <View>
          <Text style={{ color: "#1a1a1a", marginTop: -2 }}>
            {" Tôi đồng ý với "}
          </Text>
        </View>
        <TouchableOpacity onPress={onPressTerms}>
          <Text style={{ color: "#1c70be", marginTop: -2 }}>
            điều khoản Mạng xã hội của Zalo
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isContinueEnabled ? "#1c70be" : "#d3d6db" },
          ]}
          onPress={() => {
            console.log(phoneNumber);
            setIsOverlayVisible(true);
            setModalVisible(true);
          }}
          disabled={!isContinueEnabled}
        >
          <Text
            style={{
              color: isContinueEnabled ? "#fff" : "#abaeb3",
              textAlign: "center",
            }}
          >
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 80, marginTop: 330 }}>
        <View>
          <Text style={{ color: "#1a1a1a" }}>Bạn đã có tài khoản?</Text>
        </View>
        <TouchableOpacity onPress={onPressTerms}>
          <Text style={{ color: "#0867ef" }}> Đăng nhập ngay</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => handleCloseModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 17 }}>
              Nhận mã xác thực qua số {phoneNumber}
            </Text>
            <Text style={{ fontSize: 13, marginTop: 20 }}>
              Zalo sẽ gửi mã xác thực cho bạn qua số điện thoại này
            </Text>
            <View style={styles.separator} />
            <TouchableOpacity
              onPress={() => {
                handleVerifyCode();
                handleSubmit();
              }}
            >
              <Text
                style={{
                  color: "#0867ef",
                  textAlign: "center",
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                Tiếp tục
              </Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity onPress={rollback}>
              <Text style={{ textAlign: "center", fontSize: 15, marginTop: 5 }}>
                Đổi số khác
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Success OTP */}
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
              Gửi OTP thành công
            </Text>
            <View style={styles.separator} />
            <Text>• Mã đã được gửi, kiểm tra điện thoại của bạn</Text>
            <Text>• OTP chỉ có hiệu lực trong vòng 3 phút</Text>
            <TouchableOpacity
              onPress={() => {
                handleCloseModal();
                navigation.navigate("Authentication", {
                  phoneNumber: phoneNumber,
                });
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

      {/* Fail OTP */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={failureModalVisible}
        onRequestClose={() => handleCloseModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent2}>
            <Text
              style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}
            >
              Gửi OTP thất bại
            </Text>
            <View style={styles.separator} />
            <Text style={{ fontSize: 13 }}>
              Có thể bạn đã gặp phải một số trường hợp:
            </Text>

            <Text>• Số điện thoại không hợp lệ</Text>
            <Text>• Số điện thoại đã được đăng ký</Text>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    position: "relative",
    flex: 1,
  },
  font: {
    top: 40,
    fontSize: 30,
    color: "#1a1a1a",
    fontWeight: "bold",
    marginLeft: 46,
  },
  phoneInputContainer: {
    marginLeft: 45,
    marginTop: 50,
  },
  button: {
    width: 300,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 45,
    top: 40,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 250,
    height: 250,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalContent2: {
    width: 250,
    height: 250,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: "black",
    marginVertical: 10,
    marginTop: 20,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 10,
    width: 10,
    height: 10,
  },
});

export default RegisterForm;
