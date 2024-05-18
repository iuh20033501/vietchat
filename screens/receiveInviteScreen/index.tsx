import { ScrollView, View, Text, Alert } from "react-native";
import ObjectReceive from "./objectReceive";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  acceptFriendApi,
  getListContactApi,
  rejectFriendApi,
} from "../../apis/user.api";

const ReceiveInvite = () => {
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const [contacts, setContacts] = useState([]);
  const navigation = useNavigation();

  const getListContact = useQuery({
    queryKey: ["getListContact", "request"],
    queryFn: () =>
      getListContactApi(token, "request")
        .then((res) => {
          setContacts([...res.data]);
          return res.data;
        })
        .catch((err) => console.log(err["response"])),
  });

  if (getListContact.isLoading) return <Text>Loading...</Text>;

  const handleReject = async (id) => {
    const res = await rejectFriendApi(token, id)
      .then(async (res) => {
        await queryClient.invalidateQueries({ queryKey: ["getListChatRoom"] });
        await Alert.alert("Thông báo", res.data);
        setContacts(prevContacts => prevContacts.filter(item => item.profile.id !== id));
      })
      .catch((err) => console.log(err["response"]));
  };
  const handleSubmit = async (id) => {
    console.log("id", id);
    const res = await acceptFriendApi(token, id)
      .then(async (res) => {
        await queryClient.invalidateQueries({ queryKey: ["getListChatRoom"] });
        await Alert.alert("Thông báo", res.data);
        setContacts(prevContacts => prevContacts.filter(item => item.profile.id !== id));
      })
      .catch((err) => {
        Alert.alert("Thông báo", err.response.data.detail);
      });
  };
  return (
    <ScrollView style={{ marginTop: 10 }}>
      {contacts.map((item) => (
        <ObjectReceive
          key={item.profile.id}
          data={item}
          handleReject={handleReject}
          handleSubmit={handleSubmit}
        />
      ))}
    </ScrollView>
  );
};
export default ReceiveInvite;
