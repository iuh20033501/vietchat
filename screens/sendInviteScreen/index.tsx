import { ScrollView, View, Text,Alert } from "react-native";
import ObjectChat from "../listChatScreen/objectChat";
import ObjectSend from "./objectSend";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getListContactApi } from "../../apis/user.api";
import { sendRecallFriendApi } from "../../apis/user.api";
const SendInvite = ({navigation}) => {
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const [contacts, setContacts] = useState([]);

  const getListContact = useQuery({
    queryKey: ["getListContact", "sent"],
    queryFn: () =>
      getListContactApi(token, "sent")
        .then((res) => {
          setContacts([...res.data]);
          return res.data;
        })
        .catch((err) => console.log(err["response"])),
  });

  if (getListContact.isLoading) return <Text>Loading...</Text>;
  const handleCancel = async (id) => {
    try {
        const res = await sendRecallFriendApi(token, id);
        Alert.alert("Thông báo", res.data);
        setContacts(prevContacts => prevContacts.filter(item => item.profile.id !== id));
    } catch (error) {
        console.log(error.response);
    }
};


  return (
    <ScrollView style={{ marginTop: 10 }}>
      {contacts.map((element) => (
        <ObjectSend key={element.profile.id} data={element} handleCancel={handleCancel}/>
      ))}
    </ScrollView>
  );
};
export default SendInvite;
