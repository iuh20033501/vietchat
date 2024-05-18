import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
} from "react-native";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";
import Friend from "./friend";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getListContactApi } from "../../apis/user.api";

const BodyContact = () => {
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setContacts([
      ...(queryClient.getQueryData(["getListContact", "friend"]) as []),
    ]);
  }, []);
  // Sort contacts alphabetically by name
  const sortedContacts = contacts
    .slice()
    .sort((a, b) => a.displayName.localeCompare(b.displayName));

  const groupedContacts = sortedContacts.reduce((acc, contact) => {
    const initial = contact.displayName[0].toUpperCase();
    if (!acc[initial]) {
      acc[initial] = [];
    }
    acc[initial].push(contact);
    return acc;
  }, {});

  const sections = Object.keys(groupedContacts).map((initial) => ({
    title: initial,
    data: groupedContacts[initial],
  }));

  const handPressInvite = () => {
    navigation.navigate("TabInvite" as never);
  };
  return (
    <View style={{ marginTop: 5 }}>
      <TouchableOpacity style={styles.header} onPress={handPressInvite}>
        <View style={styles.icon}>
          <IconFontAwesome5 name="user-friends" color="#ffffff" size={25} />
        </View>
        <Text style={{ fontSize: 18 }}>Lời mời kết bạn</Text>
      </TouchableOpacity>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.profile.id}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Friend item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default BodyContact;
