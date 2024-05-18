import axios, { AxiosInstance } from "axios";
export const ip = "192.168.1.8"
class Http {  
  private static instance: AxiosInstance;
  
  static getInstance() {
    
    if (!Http.instance) {
      Http.instance = axios.create({
        baseURL: `http://${ip}:8080/api`, // change ip address to your local ip address ipconfig
        timeout: 20000,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return Http.instance;
  }
}

const http = Http.getInstance();

export default http;
