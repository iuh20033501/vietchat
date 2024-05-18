import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { backgroundHeader, white } from "../../assets/colors";
import { CheckBox } from "@rneui/themed";
import { Avatar } from "react-native-elements";

const Friend = ({ item, isChecked, onCheckboxPress }) => {

  return (
    <View>
      <TouchableOpacity style={styles.object} onPress={() => onCheckboxPress(item.profile.id, !isChecked)}>
        <CheckBox
          checked={isChecked}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
        />
        <Avatar
          rounded={true}
          size={"medium"}
          title={item.displayName[0]}
          activeOpacity={0.7}
          source={{uri: item.profile.thumbnailAvatar }}
        />
        <Text style={{ fontSize: 18, flex: 1 }}>{item.displayName}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  object: {
    height: 60,
    justifyContent: "flex-start",
    borderBottomWidth: 0.2,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: white,
  },
  img: {
    width: 45,
    height: 45,
    borderRadius: 40,
    marginHorizontal: "2%",
  },
});

export default Friend;
