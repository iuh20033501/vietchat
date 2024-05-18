// screens/HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50, fontWeight: 'bold', color: 'blue', marginTop: 100 }}>
        Viet Chat
      </Text>
      <Button
        title="Đăng nhập"
        onPress={()=>navigation.navigate('SignIn' as never)}
        titleStyle={{ fontWeight: '500', fontSize: 30 }}
        buttonStyle={{
          backgroundColor: 'blue',
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 300,
          marginTop: 400,
          marginHorizontal: 50,
          marginVertical: 20,
        }}
      />
      <Button
        title="Đăng Ký"
        onPress={() => navigation.navigate("RegisterForm" as never)}
        titleStyle={{ fontWeight: '500', fontSize: 30 }}
        buttonStyle={{
          backgroundColor: 'gray',
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 300,
          marginHorizontal: 50,
          marginVertical: 0,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default HomeScreen;
