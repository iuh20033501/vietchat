import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { backgroundHeader, white } from "../../assets/colors";
import Friend from "./friend";
import { useQueryClient } from "@tanstack/react-query";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const BodyModal = ({ setListItem, navigation }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setContacts([
      ...(queryClient.getQueryData(["getListContact", "friend"]) as []),
    ]);
  }, []);
  // checkbox
  useEffect(() => {
    setListItem(checkedItems);
  }, [checkedItems, setListItem]);

  const handleCheckboxPress = (id, isChecked) => {
    if (isChecked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, id]);
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== id)
      );
    }
  };
  // Sort contacts alphabetically by name
  const filteredContacts = contacts.filter((contact) =>
    contact.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedContacts = filteredContacts
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

  return (
    <View style={{ marginTop: 5 }}>
      <View style={styles.containerFind}>
        <IconMaterialCommunityIcons name="magnify" color="black" size={20} />
        <TextInput
          style={styles.textInput}
          placeholder="Tìm kiếm bạn bè"
          placeholderTextColor={"gray"}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item?.profile?.id}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Friend
            item={item}
            isChecked={checkedItems.includes(item.profile.id)}
            onCheckboxPress={handleCheckboxPress}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: white,
    marginBottom: 10,
  },
  icon: {
    borderRadius: 8,
    backgroundColor: backgroundHeader,
    alignSelf: "flex-start",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "3%",
  },
  listFriend: {},
  container: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    backgroundColor: white,
    padding: 10,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
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
  containerFind: {
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    height: 40,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: "center",
    marginVertical: 10,
  },

  textInput: {
    fontSize: 15,
    flex: 1,
    marginLeft: 10,
  },
});
export default BodyModal;
