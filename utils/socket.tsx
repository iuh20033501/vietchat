import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { ip } from "./http";
let stompClient = null;

export const connectSocket = async () => {
  if (!stompClient) {
    const Sock = await new SockJS(`http://${ip}:8080/api/ws`);
    stompClient = await Stomp.over(Sock);
  }
  return await stompClient;
};

export const disconnectSocket = () => {
  if (stompClient) {
    stompClient.disconnect();
    stompClient = null;
  }
};
