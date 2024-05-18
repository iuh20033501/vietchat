import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import ArrowIcon from "../../assets/icon/ArrowIcon";
import http from "../../utils/http";
import { useQueryClient } from "@tanstack/react-query";

const Authentication = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  //  const [phoneNumber, setPhoneNumber] = useState('0929635572');
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [failureModalVisible, setFailureModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successRequest, setSuccessRequest] = useState(false);
  const queryClient = useQueryClient();
  const isCodeComplete = verificationCode.replace(/\s/g, "").length === 6;
  const handleSubmit = async () => {
    try {
      const response = await http.post("/v1/verification/otp/sms/validate", {
        headers: {
          "Content-Type": "application/json",
        },
        phone: phoneNumber,
        otp: verificationCode,
      });

      if (!response) {
        throw new Error("Lỗi");
      }
      const data = await response.data;
      const token = data.accessToken;
      queryClient.setQueryData(["phoneLogin"], phoneNumber);
      console.log(data);
      setSuccessModalVisible(true);
      setTimeout(() => {
        navigation.navigate("Register", { accessToken: token });
      }, 1500);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setFailureModalVisible(true);
    }
  };

  const RequestCodeAgain = async () => {
    const requestBody = {
      phone: phoneNumber,
    };

    await http
      .post("/v1/verification/otp/sms/send", {
        headers: {
          "Content-Type": "application/json",
        },

        phone: phoneNumber,
      })
      .then((response) => {
        if (!response) {
          throw new Error("Network response was not ok");
        }
        return response.status;
      })
      .then((data) => {
        console.log(data);
        setSuccessRequest(true);
      });
  };

  const handleCloseModal2 = () => {
    setSuccessRequest(false);
  };

  const handleCloseModal = () => {
    setFailureModalVisible(false);
    setSuccessModalVisible(false);
  };

  return (
    <View style={styles.container}>
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
      {successRequest && (
        <TouchableWithoutFeedback onPress={() => handleCloseModal2()}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <View style={{ marginLeft: 5 }}></View>

      <View>
        <Text style={styles.font}>Nhập mã xác thực</Text>
      </View>

      <View>
        <Text
          style={{
            color: "#868c92",
            fontSize: 13,
            textAlign: "center",
            marginTop: 50,
          }}
        >
          Nhập 6 dãy số được gửi đến số điện thoại{" "}
        </Text>
        <Text
          style={{
            color: "#000",
            fontSize: 15,
            textAlign: "center",
            marginTop: 20,
            fontWeight: "bold",
          }}
        >
          (+VietNam) {phoneNumber}
        </Text>
      </View>

      <View style={styles.phoneInputContainer}>
        <TextInput
          style={styles.input}
          value={verificationCode}
          onChangeText={(value) =>
            setVerificationCode(value.replace(/\s/g, ""))
          } // Loại bỏ dấu cách
          keyboardType="numeric"
          maxLength={6}
        />
      </View>

      <View>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isCodeComplete ? "#1c70be" : "#d3d6db" },
          ]}
          onPress={async () => {
            handleSubmit();
          }}
          disabled={!isCodeComplete}
        >
          <Text
            style={{
              color: isCodeComplete ? "#fff" : "#abaeb3",
              textAlign: "center",
            }}
          >
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 80, marginTop: 20 }}>
        <Text>Bạn không nhận được mã?</Text>
        <TouchableOpacity onPress={() => RequestCodeAgain()}>
          <Text style={{ color: "#0867ef" }}> Gửi lại</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 70, marginTop: 250 }}>
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: "#fff",
              backgroundColor: "#0867ef",
              borderRadius: 100,
              width: 17,
              height: 17,
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            ?
          </Text>
          <Text
            style={{
              color: "#0867ef",
              fontWeight: "bold",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            {" "}
            Tôi cần hỗ trợ thêm về mã xác thực
          </Text>
        </TouchableOpacity>
      </View>
      {/* SUCCESS OTP */}
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
              Nhập OTP thành công
            </Text>
            <View style={styles.separator} />
            <Text>• Hãy bắt đầu với việc đăng ký thông tin cá nhân</Text>
            <Text>• Vui lòng tuân thủ các điều khoản của Zalo</Text>
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

      {/* FAIL OTP */}
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
              Nhập OTP thất bại
            </Text>
            <View style={styles.separator} />
            <Text style={{ fontSize: 13 }}>
              Có thể bạn đã gặp phải một số trường hợp:
            </Text>

            <Text>• Mã OTP không đúng</Text>
            <Text>• Mã OTP đã hết hiệu lực</Text>
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
      {/* REQUEST MORE TIME */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={successRequest}
        onRequestClose={() => handleCloseModal2()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent2}>
            <Text
              style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}
            >
              Đã gửi lại mã OTP
            </Text>
            <View style={styles.separator} />
            <Text>• Kiểm tra mã OTP trên số điện thoại của bạn</Text>
            <Text>• Đảm bảo rằng số điện thoại của bạn vẫn còn hoạt động</Text>
            <TouchableOpacity
              onPress={() => {
                handleCloseModal2();
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
    fontSize: 25,
    color: "#1a1a1a",
    fontWeight: "bold",
    textAlign: "center",
  },
  phoneInputContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 50,
    alignItems: "center",
    marginTop: 30,
    borderRadius: 30,
    marginLeft: 35,
  },
  button: {
    width: 300,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 45,
    marginTop: -20,
  },
  input: {
    height: 45,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 10,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 4,
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
  closeButton: {
    position: "absolute",
    top: 0,
    right: 10,
    width: 10,
    height: 10,
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

export default Authentication;
