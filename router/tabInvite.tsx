import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ReceiveInvite from '../screens/receiveInviteScreen';
import SendInvite from '../screens/sendInviteScreen';

const Tab = createMaterialTopTabNavigator();

const TabInvite = ()=> {
  return (
    <Tab.Navigator
    initialRouteName="Receive"
    >
      <Tab.Screen name="Receive" component={ReceiveInvite} options={{tabBarLabel:"Đã nhận"}}/>
      <Tab.Screen name="Send" component={SendInvite} options={{tabBarLabel:"Đã gửi"}}/>
    </Tab.Navigator>
  );
}

export default TabInvite