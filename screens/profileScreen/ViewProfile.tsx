import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import ArrowIcon from '../../assets/icon/ArrowIcon';
import axios from 'axios';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from "expo-image-picker";
import { RadioButton } from "react-native-paper";
import { useQueryClient } from '@tanstack/react-query';
import http from '../../utils/http';
import {
    getLinkuploadApi,
} from "../../apis/chat.api";
import { decode } from "base64-arraybuffer";

const ViewProfile = ({ navigation, route }) => {
    const [data, setData] = useState();
    const [coverPhoto, setCoverPhoto] = useState(require("../../assets/profileTest/wall3.jpg"));
    const [phoneNumber, setPhoneNumber] = useState('0929635572');
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [birthday, setBirthday] = useState();
    const [gender, setGender] = useState();
    const [thumbnailAvatar, setThumbnailAvatar] = useState();
    const [coverImage, setCoverImage] = useState();
    const [showAvatarOptions, setShowAvatarOptions] = useState(false);
    const [showCoverOptions, setShowCoverOptions] = useState(false);
    const [showMoreInfor, setMoreInfor] = useState(false);
    const [showInformation, setInformation] = useState(false);
    const [editInformation, setEditInformation] = useState(false);
    const [canEditInformation, setCanEditInformation] = useState(false);
    const [click, setClick] = useState(false)
    const defaultAvatar = require('../../assets/profileTest/defaultAVT.jpg')
    const [profileData, setProfileData] = useState(null);
    const queryClient = useQueryClient();
    const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
    const [url, setURL] = useState("");
    const [newUrl, setNewURL] = useState();
    useEffect(() => {
        getUserProfile();
    }, [profileData]);

    useEffect(() => {
        if (route.params && route.params.updatedData) {
            setProfileData(route.params.updatedData);
        }
    }, [route.params]);
    const getUserProfile = () => {
        try {
            http.get('/v1/users/profile', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    const data = res.data;
                    setData(data);
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setThumbnailAvatar(data.thumbnailAvatar);
                    setBirthday(data.birthday);
                    setGender(data.gender);
                    setCoverImage(data.coverImage)
                }).catch((error) => {
                    console.log(error)
                });
        } catch (error) {
            console.error(error.message);
        }
    }
    const getGenderString = () => {
        return gender ? 'Nam' : 'Nữ';
    }
    return (
        <View style={{ flex:1 }}>
            <ScrollView style={styles.container}>

                    <View style={{ flex: 1}}>
                        <View style={{}}>
                            <Image
                                 source={coverImage ? { uri: coverImage } : coverPhoto}
                                style={styles.coverPhoto}
                            />
                            <TouchableOpacity style={[styles.Button, styles.FisrtRightButton]} onPress={() => navigation.navigate("ProfileScreen")}>
                                <ArrowIcon width={30} height={30} color="#1a1a1a" />
                            </TouchableOpacity>
                            <View style={styles.avatarContainer2}>
                                <Avatar
                                    size={70}
                                    rounded={true}
                                    source={thumbnailAvatar ? { uri: thumbnailAvatar } : defaultAvatar}
                                />
                                <Text style={{ alignSelf: 'center', marginLeft: 15, fontSize: 20, fontWeight: 'bold'}}>{firstName} {lastName}</Text>
                            </View>
                        </View>

                        <View style={styles.profileContainer}>
                            <Text style={{ fontSize: 16 }}>Thông tin cá nhân</Text>
                            <Text style={styles.profileText}>Giới tính:               {getGenderString()}</Text>
                            <Text style={styles.profileText}>Ngày sinh:            {birthday}</Text>
                            <View>
                                <Text style={styles.profileText}>Điện thoại:           {phoneNumber}</Text>
                            </View>
                            <TouchableOpacity style={{
                                width: 300,
                                height: 30,
                                borderRadius: 20,
                                backgroundColor: '#009bf8',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                marginTop: 20,
                                marginLeft: -15
                            }} onPress={() => { navigation.navigate('DetailProfile', { data: data })}}>
                                <Text style={{ alignSelf: 'center', fontSize: 16 }}>Chỉnh sửa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    coverPhoto: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    Button: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },

    FisrtRightButton: {
        left: 10,
    },
    SecondRightButton: {
        right: 10,
        top: 20
    },
    backIcon: {
        width: 30,
        height: 30,
    },
    middleContent: {
        alignItems: 'center',
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: -50,
    },
    avatarContainer2: {
        marginTop: -80,
        flexDirection: 'row',
        marginLeft: 10,
        alignItems: 'flex-start',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',

    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    photoButton: {
        width: 140,
        flexDirection: 'row',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 5,
        backgroundColor: '#fff',
        borderBlockColor: 'gray',
        borderWidth: 1,
        justifyContent: 'center'
    },
    buttonText: {
        marginLeft: 2,
        marginTop: 5,
        color: 'black',
        fontSize: 14,
    },
    wallContainer: {
        padding: 20,
    },
    wallText: {
        fontSize: 14,
        marginTop: -10,
        marginLeft: 10
    },
    icon: {
        width: 30,
        height: 30,
    },
    postButton: {
        width: 200,
        height: 45,
        borderRadius: 20,
        backgroundColor: '#009bf8',
        paddingVertical: 15,
    },
    TextButton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: -5
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        height: '25%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalContainer2: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        justifyContent: 'center',
    },
    optionContainer: {
        backgroundColor: '#fff',
        width: '98%',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 20,
    },
    optionContainer2: {
        backgroundColor: '#fff',
        width: '98%',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 20,
        marginTop: 4
    },
    optionButton: {
        backgroundColor: '#eee',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        borderBlockColor: 'black',
        borderWidth: 0.5
    },
    optionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    profileContainer: {
        marginTop: 20,
        marginLeft: 20
    },
    profileText: {
        fontSize: 15,
        paddingTop: 20,
        marginLeft: 10
    }
});

export default ViewProfile;