import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ContactScreen from '../screens/contacScreen/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListChatScreen from '../screens/listChatScreen/index';
import TabContact from './tabContact';
import Header from '../screens/components/headerFind';
import ProfileScreen from '../screens/profileScreen/ProfileScreen';


const Tab = createBottomTabNavigator();

const TabChat = () => {
  return (
    <Tab.Navigator
      initialRouteName="ListChat"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="ListChat"
        component={ListChatScreen}
        options={{
          tabBarLabel: 'Tin nhắn',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
          header:()=><Header/>
        }}
      />
      <Tab.Screen
        name="TabContact"
        component={TabContact}
        options={{
          tabBarLabel: 'Danh bạ',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="contacts" color={color} size={size} />
          ),
          header:()=><Header/>
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          header:()=><Header/>
        }}
      />
    </Tab.Navigator>

  )
}

export default TabChat