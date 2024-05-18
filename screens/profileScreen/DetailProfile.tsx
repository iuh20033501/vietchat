import React from "react";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import ArrowIcon from "../../assets/icon/ArrowIcon";
import { Avatar } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import Icon from "react-native-vector-icons/FontAwesome";
import { useQueryClient } from "@tanstack/react-query";
import http from "../../utils/http";
import {
  getLinkuploadApi,
} from "../../apis/chat.api";
import { decode } from "base64-arraybuffer";
import * as ImagePicker from "expo-image-picker";

const DetailProfile = ({ navigation, route }) => {
  const [coverPhoto, setCoverPhoto] = useState(
    require("../../assets/profileTest/wall3.jpg")
  );
  const defaultAvatar = require("../../assets/profileTest/defaultAVT.jpg");
  const { data } = route.params;
  const [newFirstName, setNewFirstName] = useState(data.firstName);
  const [newLastName, setNewLastName] = useState(data.lastName);
  const [newBirthday, setNewBirthday] = useState(new Date(data.birthday));
  const [newGender, setNewGender] = useState(data.gender);
  const [thumbnailAvatar, setThumbnailAvatar] = useState(data.thumbnailAvatar);
  // const { updateProfileData } = route.params;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const [url, setURL] = useState("");
  const [newUrl, setNewURL] = useState();
  const formattedDate = `${newBirthday
    .getDate()
    .toString()
    .padStart(2, "0")}-${(newBirthday.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${newBirthday.getFullYear()}`;

  const submitEdit = async () => {


    const requestBody = {
      firstName: newFirstName,
      lastName: newLastName,
      gender: newGender,
      birthday: formattedDate,
      thumbnailAvatar: thumbnailAvatar
    };

    if (!newFirstName.trim()) {
      Alert.alert("Lỗi", "Họ không được để trống", [{ text: "OK" }]);
      return;
    }
    if (!newLastName.trim()) {
      Alert.alert("Lỗi", "Tên không được để trống", [{ text: "OK" }]);
      return;
    }
    if (newBirthday.getUTCFullYear() > new Date().getUTCFullYear() - 18) {
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

    await http
      .put("/v1/users/profile", requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .then((data) => {
        console.log("Cập nhật thành công thành công:", data);
        navigation.navigate("ProfileScreen", { updatedData: data });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  // const postFileNameToServer = async (fileName: string) => {
  //   try {
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     };
  //     const requestData = {
  //       filename: fileName,
  //       type: "AVATAR"
  //     };
  //     const res = await http.post("/v1/files", requestData, { headers }).catch((err) => err.response);
  //     // return response.data.url;
  //     console.log(res.data);
  //     // const uriParts = url.split(",");
  //     // const base64Data = uriParts[1];
  //     // const arrayBuffer = await decode(base64Data);
  //     // const resUpload = await axios.put(res.data, arrayBuffer);
  //     // const newUrl = res.data.substring(0, res.data.indexOf("?"));
  //     // console.log(newUrl)
  //   } catch (error) {
  //     console.log("Error posting fileName to server:", error);
  //     return null;
  //   }
  // };

  const pickImage = async (useLibrary: boolean) => {
    let result = null;
    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        quality: 1,
      });
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        quality: 1,
      });
    }

    if (!result.canceled) {
      const newImage = result.assets[0];
      const uri = newImage.fileName
      console.log(uri?.uri)
      console.log("url: ", newImage?.uri)
      setURL(uri);
      http.put("/v1/users/profile", { thumbnailAvatar: newImage?.uri }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        console.log("res", res?.data);
        setThumbnailAvatar(newImage?.uri);
      })
      return uri;
    }
  };
  console.log(url)



  const handleToggleDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, date) => {
    if (date) {
      setNewBirthday(date);
    }
    setShowDatePicker(false);
  };
  useEffect(() => {
    if (data.birthday) {
      const parsedDate = parseDateStringToDate(data.birthday);
      setNewBirthday(parsedDate);
    }
  }, [data.birthday]);
  function parseDateStringToDate(dateString) {
    const [day, month, year] = dateString.split('-').map(str => parseInt(str, 10));
    const date = new Date(year, month - 1, day);
    return date;
  }

  return (
    <View style={styles.container}>
      {showDatePicker && (
        <DateTimePicker
          value={newBirthday}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}
      <View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => navigation.navigate("ViewProfile")}
          >
            <ArrowIcon width={30} height={30} color="#1a1a1a" />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, marginTop: 13, left: 30 }}>
            Chỉnh sửa thông tin
          </Text>
        </View>
        <View style={{ marginTop: 40, flexDirection: "row" }}>
          <TouchableOpacity onPress={() => pickImage(true)}>
            <Avatar
              size={100}
              rounded={true}
              source={thumbnailAvatar? {uri :thumbnailAvatar}: defaultAvatar}
            />
          </TouchableOpacity>

          <View style={styles.profileContainer}>
            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 20, alignSelf: "center" }}>Họ:</Text>
              <TextInput
                style={styles.input}
                placeholder={"Nhập họ mới"}
                onChangeText={(text) => setNewFirstName(text)}
                value={newFirstName}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 20, alignSelf: "center" }}>Tên:</Text>
              <TextInput
                style={styles.input}
                placeholder={"Nhập tên mới"}
                onChangeText={(text) => setNewLastName(text)}
                value={newLastName}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 18 }}>
                {newBirthday.toLocaleDateString()}
              </Text>

              <TouchableOpacity
                style={{ marginLeft: 70 }}
                onPress={handleToggleDatePicker}
              >
                <Icon name="calendar" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <RadioButton.Group
            onValueChange={(newValue) => {
              if (typeof newValue !== "undefined") {
                setNewGender(newValue === "true" ? true : false);
              }
            }}
            value={newGender ? "true" : "false"}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 10,
                  margin: 10,
                  left: 120,
                }}
              >
                <RadioButton value="true" />
              </View>
              <Text style={{ left: 130 }}>Nam</Text>

              <View
                style={{
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 10,
                  margin: 10,
                  left: 150,
                }}
              >
                <RadioButton value="false" />
              </View>
              <Text style={{ left: 160 }}>Nữ</Text>
            </View>
          </RadioButton.Group>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: 300,
          height: 30,
          borderRadius: 20,
          backgroundColor: "#009bf8",
          alignSelf: "center",
          justifyContent: "center",
          marginTop: 20,
          marginLeft: -15,
        }}
        onPress={submitEdit}
      >
        <Text style={{ alignSelf: "center", fontSize: 16 }}>Chỉnh sửa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    marginLeft: 30,
  },
  profileText: {
    fontSize: 15,
    paddingTop: 20,
    marginLeft: 10,
  },
  inputContainer: {
    marginTop: -10,
    padding: 10,
    flexDirection: "row",
  },
  input: {
    height: 40,
    fontSize: 20,
    marginLeft: 10,
  },
  Button: {
    marginTop: 10,
  },
});

export default DetailProfile;
