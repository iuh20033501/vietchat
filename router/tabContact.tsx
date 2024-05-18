import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ContactScreen from '../screens/contacScreen';
import ListGroupScreen from '../screens/listGroupScreen';

const Tab = createMaterialTopTabNavigator();

const TabContact =()=> {
  return (
    <Tab.Navigator
    initialRouteName="ListContact"
    >
      <Tab.Screen name="ListContact" component={ContactScreen} options={{tabBarLabel:"Bạn bè"}}/>
      <Tab.Screen name="ListGroup" component={ListGroupScreen} options={{tabBarLabel:"Nhóm"}}/>
    </Tab.Navigator>
  );
}

export default TabContact