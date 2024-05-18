import { useQueryClient } from "@tanstack/react-query";
import http from "../utils/http";

export const getListChatRoomApi = (token) => {
  return http.get("/v1/users/profile/chats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getChatRoomApi = (token, chatRoomId) => {
  return http.get(`/v1/chats/${chatRoomId}/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendMessageToServerApi = (token, chatRoomId, formdata) => {
  // const body = {
  //   replyMessageId: string,
  //   content: string,
  //   attachments: [
  //     {
  //       type: Image,
  //       url string,
  //       filename: string
  //     }
  //   ]
  // };
  return http.post(`/v1/chats/${chatRoomId}/messages`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMessageApi = (token, chatRoomId, messageId) => {
  return http.delete(`/v1/chats/${chatRoomId}/messages/${messageId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const unsentMessageApi = (token, chatRoomId, messageId) => {
  return http.put(
    `/v1/chats/${chatRoomId}/messages/${messageId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getLinkuploadApi = (token, file) => {
  return http.post(`/v1/files`, file, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// lấy thông tin chat room
export const getChatDetailApi = (token, chatRoomId) => {
  return http.get(`/v1/chats/${chatRoomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
