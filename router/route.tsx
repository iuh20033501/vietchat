import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/signInScreen/index";
import HomeScreen from "../screens/homeScreen/index";
import TabChat from "./tabChat";
import ChatScreen from "../screens/chatScreen/index";
import TabInvite from "./tabInvite";
import { backgroundHeader } from "../assets/colors";
import Hearder from "../screens/components/header";
import { Title } from "react-native-paper";
import OptionScreen from "../screens/optionScreen/optionChat";
import RegisterForm from "../screens/singUpScreen/RegisterForm";
import Authentication from "../screens/singUpScreen/Authentication";
import FindScreen from "../screens/findScreen/FindScreen";
import Register from "../screens/singUpScreen/Register";
import ForgetPassword from "../screens/forgetPasswordScreen/forgetPassword";
import ConfirmOTP from "../screens/forgetPasswordScreen/confirmOTP";
import ResetPassword from "../screens/forgetPasswordScreen/ResetPassword";
import ResultFindProfile from "../screens/findScreen/ResultFindProfile";
import DetailProfile from "../screens/profileScreen/DetailProfile";
import OptionChatGroup from "../screens/optionScreen/optionChatGroup";
import ViewProfile from "../screens/profileScreen/ViewProfile";
import ProfileScreen from "../screens/profileScreen/ProfileScreen";

const Stack = createNativeStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: backgroundHeader },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, title: "" }}
      />
      {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="Find"
        component={FindScreen}
        options={{ headerShown: false, title: "" }}
      />
      {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="TabChat"
        component={TabChat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabInvite"
        component={TabInvite}
        options={{
          header: () => <Hearder title={"Lời mời kết bạn"} />,
        }}
      />
      <Stack.Screen
        name="OptionChat"
        component={OptionScreen}
        options={{
          header: () => <Hearder title={"Tùy chọn"} />,
        }}
      />
      <Stack.Screen
        name="OptionChatGroup"
        component={OptionChatGroup}
        options={{
          header: () => <Hearder title={"Tùy chọn"} />,
        }}
      />
      <Stack.Screen
        name="RegisterForm"
        component={RegisterForm}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="Authentication"
        component={Authentication}
        options={{ title: "Xác thực OTP" }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ title: "Quên mật khẩu" }}
      />
      <Stack.Screen
        name="ConfirmOTP"
        component={ConfirmOTP}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="ViewProfile"
        component={ViewProfile}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="FindScreen"
        component={FindScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResultFindProfile"
        component={ResultFindProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailProfile"
        component={DetailProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default Route;
