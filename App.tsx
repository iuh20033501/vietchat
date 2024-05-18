import { NavigationContainer, CommonActions } from "@react-navigation/native";
import Route from "./router/route";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Input } from "@rneui/themed/dist/Input";
import InputChat from "./screens/chatScreen/inputChat";
import { View } from "react-native";
import { connectSocket } from "./utils/socket";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import OptionChatGroup from "./screens/optionScreen/optionChatGroup";
const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <NavigationContainer>
        <Route />
      </NavigationContainer>
    </QueryClientProvider>
    // <View
    //   style={{ flex: 1, justifyContent: "center", backgroundColor: "gray" }}
    // >
    //   <InputChat onSendMessage={"abc"} />
    // </View>
    // <OptionChatGroup navigation={navigator}/>
  );
};
export default App;
