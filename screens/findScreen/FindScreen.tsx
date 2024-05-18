import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import axios from 'axios';
import { Avatar } from 'react-native-elements';
import ArrowIcon from '../../assets/icon/ArrowIcon';
import { useQueryClient } from '@tanstack/react-query';
import http from '../../utils/http';

const FindScreen = ({ navigation, route }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [data, setData] = useState(null) as any;
  const [phoneNumber, setPhoneNumber] = useState('');
  const defaultAvatar = require('../../assets/profileTest/defaultAVT.jpg');
  const [thumbnailAvatar, setThumbnailAvatar] = useState('');
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
  const handleSearch = () => {
    if (phoneNumber.trim() !== '') {
      setSearchHistory([...searchHistory, phoneNumber]);
      getUserProfile(phoneNumber);
    }
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  const getUserProfile = async (phoneNumber) => {
    try {
      await http.get(`/v1/users/profile/${phoneNumber}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      
      }).then((res) => {
        const data = res.data;
        console.log('Thông tin người dùng:', data);
        setData(data);
        setThumbnailAvatar(data.thumbnailAvatar)
      }).catch((error) => {
        console.log(error)
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image
            source={require('../../assets/icon/back.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={styles.findnav}>
          <TouchableOpacity onPress={handleSearch}>
            <Image
              source={require('../../assets/icon/dsearch.png')}
              style={styles.searchIcon}
            />
          </TouchableOpacity>

          <TextInput
            placeholder='Tìm kiếm'
            style={styles.inputText}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType='number-pad'
            maxLength={10}
          />
        </View>
        <TouchableOpacity>
          <Image
            source={require('../../assets/icon/qr.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View>
        {/* navigation.navigate('DetailProfile', { data: data }) */}
        {data && (
          <View style={styles.userDataContainer}>
            <View style={{
              right: 10,
              top: 20,
              position: 'absolute',
              zIndex: 1,
            }}>
              <TouchableOpacity onPress={() => setData(null)}>
                <Image
                  source={require('../../assets/icon/close.png')}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity >
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ResultFindProfile', { data: data, phoneNumber: phoneNumber })}>
              <View style={{ flexDirection: 'row' }}>
                <Avatar
                  size={100}
                  rounded={true}
                  source={thumbnailAvatar ? { uri: thumbnailAvatar } : defaultAvatar}
                />
                <View>
                  <Text style={styles.userDataText}>{data?.firstName} {data.lastName}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#7f7f7f', marginLeft: 10 }}>Số điện thoại: </Text>
                    <Text style={{ color: '#00aeef' }}>{phoneNumber}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

      </View>
      {/* Mini Apps bạn có thể tìm */}
      <View style={styles.minibar}>
        <Text style={{ fontSize: 13, fontWeight: 'bold', marginLeft: 20 }}>Mini Apps bạn có thể tìm</Text>
        <TouchableOpacity style={{ left: '43%', width: 30, height: 30 }}>
          <Image
            source={require('../../assets/icon/close.png')}
          />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <View style={styles.itembar}>
          <TouchableOpacity>
            <Image style={styles.item} source={require('../../assets/icon/zmelody.jpg')} />
            <Text style={styles.input}>Zmelody</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.itembar}>
          <TouchableOpacity>
            <Image style={styles.item} source={require('../../assets/icon/zalopay.png')} />
            <Text style={styles.input}>Zalo Pay</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Truy cập nhanh */}
      <View style={styles.minibar}>
        <Text style={{ fontSize: 13, fontWeight: 'bold', marginLeft: 20 }}>Truy cập nhanh</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.itembar}>
          <TouchableOpacity>
            <Image style={styles.item} source={require('../../assets/icon/zalovideo.jpg')} />
            <Text style={styles.input}>Zalo video</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Từ khóa đã tìm */}
      <View style={styles.historysearch}>
        <Text style={{ fontSize: 13, fontWeight: 'bold', marginLeft: 20 }}>Từ khóa đã tìm</Text>
        {searchHistory.length > 0 && (
          <View>
            <FlatList
              data={searchHistory}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => getUserProfile(item)}>
                  <Text style={styles.historyItem}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10 }} onPress={clearSearchHistory}>
          <Text style={{ color: '#4fabf4', marginLeft: 20, textAlign: 'center', }}>Xóa lịch sử tìm kiếm</Text>
          <Image source={require('../../assets/icon/next_move.png')} />
        </TouchableOpacity>
      </View>

      {/* Hiển thị thông tin người dùng */}


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:"10%"
  },
  navbar: {
    height: 50,
    backgroundColor: '#009bf8',
    flexDirection: 'row',
    alignItems: 'center',
  },
  findnav: {
    backgroundColor: '#fff',
    height: 30,
    width: '70%',
    borderRadius: 20,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    marginTop: 10,
    flexDirection: 'row',
  },
  minibar: {
    marginTop: 20,
    flexDirection: 'row',
  },
  itembar: {
    marginLeft: 10,
    flexDirection: 'row',
    paddingLeft: 15,
  },
  item: {
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  historysearch: {
    height: 300,
    marginTop: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  inputText: {
    flex: 1,
    height: 30,
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  input: {
    textAlign: 'center',
  },
  historyText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
  },
  historyItem: {
    marginLeft: 20,
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  userDataContainer: {

    padding: 10,

    flexDirection: 'row'
  },
  userDataText: {
    fontSize: 20,
    left: 10,
    marginTop: 20,
    fontWeight: 'bold'
  },
});

export default FindScreen;