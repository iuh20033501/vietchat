import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";

import { backgroundHeader, white } from "../../assets/colors";
import React, { useState } from "react";
import styles from "./styles";
import IconFeather from "react-native-vector-icons/Feather";
import IconIonicons from "react-native-vector-icons/Ionicons";
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import * as ImagePicker from "expo-image-picker";
import { ResizeMode, Video } from "expo-av";
import IconEntypo from "react-native-vector-icons/Entypo";
import * as DocumentPicker from "expo-document-picker";
import IconAntDesign from "react-native-vector-icons/AntDesign";
const InputChat = ({ onSendMessage }) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  const handSendText = async () => {
    // console.log(media);
    // onSendMessage(text, media);
    // setText("");
    setMedia([]);
    setDocument([]);


  };
  const [text, setText] = useState("");
  const inputStyle = isFocused ? styles.focusedInput : styles.defaultInput;
  const isInputEmpty = text === "" ? true : false;
  const iconStyle = isInputEmpty
    ? styles.inputEmptyText
    : styles.inputIncludeText;
  // pick media
  const [media, setMedia] = useState([]);
  const [document, setDocument] = useState([]);
  // useLibrary : true -> pick image from library, false -> pick image from camera
  const pickImage = async (useLibrary) => {
    let result = null;
    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        base64: true,
        quality: 1,
      });
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        base64: true,
        quality: 1,
      });
    }

    if (!result.canceled) {
      const newImages = result.assets.filter((item) => {
        return !media.some((mediaItem) => mediaItem.fileName === item.fileName);
      });
      setMedia([...media, ...newImages]);
    }
  };

  // pickdocument
  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: false,
        multiple: true,
      });

      if (!result.canceled) {
        const newDocument = result.assets.filter((item) => {
          return !document.some(
            (documentItem) => documentItem.name === item.name
          );
        });
        setDocument([...document, ...newDocument]);
      }
    } catch (error) {
      throw new Error("Error when pick document");
    }
  };

  const handleDeteleMedia = (fileName) => () => {
    const newMedia = media.filter((item) => item.fileName !== fileName);
    setMedia(newMedia);
  };
  const handleDeteleDocument = (fileName) => () => {
    const newDocument = document.filter((item) => item.name !== fileName);
    setDocument(newDocument);
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {media.length > 0 && (
          <>
            {media.map((item) => (
              <View key={item.uri}>
                {item.type === "image" ? (
                  <TouchableOpacity onPress={handleDeteleMedia(item.fileName)}>
                    <Image
                      source={{ uri: item.uri }}
                      style={{ width: 70, height: 70, margin: 5 }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={handleDeteleMedia(item.fileName)}>
                    <Video
                      source={{ uri: item.uri }}
                      style={{ width: 70, height: 70 }}
                      useNativeControls={true}
                      resizeMode={ResizeMode.CONTAIN}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </>
        )}

        {/* document */}
        {document.length > 0 && (
          <>
            {document.map((item) => (
              <View key={item.uri}>
                <TouchableOpacity
                  style={{ width: 60, height: 80, margin: 5, alignItems: "center"}}
                  onPress={handleDeteleDocument(item.name)}
                >
                  <IconAntDesign name="file1" size={45} />
                  <Text style={{ fontSize: 10 }} numberOfLines={2}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
      </View>
      {/* <Image source={require("../../assets/images/images.jpg")} /> */}

      <View style={[styles.chat, inputStyle]}>
        <TextInput
          style={styles.input}
          placeholder="Tin nhắn"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={(text) => {
            setText(text);
          }}
          value={text}
          multiline={true} // Enable multiline
          numberOfLines={2}
          scrollEnabled={true} // Enable scrolling
        />
        <View style={[styles.inputIcon]}>
          {text === "" ? (
            <>
              {media.length > 0 && (
                <TouchableOpacity onPress={handSendText}>
                  <IconFeather name="send" color={backgroundHeader} size={25} />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={pickDocument}
                style={{ marginRight: 10 }}
              >
                <IconEntypo name="attachment" color="black" size={25} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => pickImage(false)}
                style={{ marginRight: 10 }}
              >
                <IconIonicons name="camera" color="black" size={25} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => pickImage(true)}
                style={{ marginRight: 10 }}
              >
                <IconSimpleLineIcons name="picture" color="black" size={25} />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={handSendText}
                style={{ marginRight: 10 }}
              >
                <IconFeather name="send" color={backgroundHeader} size={25} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={pickDocument}
                style={{ marginRight: 10 }}
              >
                <IconEntypo name="attachment" color="black" size={25} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => pickImage(false)}
                style={{ marginRight: 10 }}
              >
                <IconIonicons name="camera" color="black" size={25} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => pickImage(true)}
                style={{ marginRight: 10 }}
              >
                <IconSimpleLineIcons name="picture" color="black" size={25} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};
export default InputChat;
