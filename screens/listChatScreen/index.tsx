import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Header from "../components/headerFind";
import Icon from "react-native-vector-icons/Ionicons";
import { white, backgroundHeader } from "../../assets/colors";
import ObjectChat from "./objectChat";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getListChatRoomApi } from "../../apis/chat.api";
import { useEffect } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getProfileAPI } from "../../apis/auth.api";
import { connectSocket } from "../../utils/socket";
import { getListContactApi } from "../../apis/user.api";

const ListChatScreen = ({ navigation }) => {
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const getListChatRoom = useQuery({
    queryKey: ["getListChatRoom"],
    queryFn: async () =>
      getListChatRoomApi(token)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        }),
  });
  const getListContact = useQuery({
    queryKey: ["getListContact", "friend"],
    queryFn: () =>
      getListContactApi(token, "friend")
        .then((res) => {
          queryClient.setQueryData(["getListContact", "friend"], res.data);
          return res.data;
        })
        .catch((err) => console.log(err["response"])),
  });
  const getProfile = useQuery({
    queryKey: ["getProfile"],
    queryFn: async () =>
      await getProfileAPI(token)
        .then((res) => {
          queryClient.setQueryData(["profile"], res.data);
          return res.data;
        })
        .catch((err) => console.log(err)),
  });
  // useEffect(() => {
  //   getListChatRoom.refetch(); // Refetch chat room list when component mounts
  // }, []);

  if (getListChatRoom.isLoading || getProfile.isLoading|| getListContact.isLoading)
    return <Text>Loading...</Text>;
  // console.log(getListChatRoom.data);
  return (
    <SafeAreaView>
      {/* body */}
      <ScrollView>
        {getListChatRoom.data?.map((chatRoom) => {
          return (
            <ObjectChat
              key={chatRoom.id}
              chatRoom={chatRoom}
              navigation={navigation}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListChatScreen;
