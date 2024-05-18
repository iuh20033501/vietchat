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

const ProfileScreen = ({ navigation, route }) => {
    const [data, setData] = useState();
    const [coverPhoto, setCoverPhoto] = useState(require("../../assets/profileTest/wall3.jpg"));
    const [phoneNumber, setPhoneNumber] = useState('0929635572');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
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
    const logoutToken = queryClient.getQueryData(["dataLogin"])["refreshToken"];

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
                    console.log('Thông tin người dùng:', data);
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
    const pickImage = async (useLibrary: boolean) => {
        let result = null;
        if (useLibrary) {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                base64: true,
                quality: 1,
            });
        } else {
            await ImagePicker.requestCameraPermissionsAsync();
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                base64: true,
                quality: 1,
            });
        }

        if (!result.canceled) {
            const newImage = result.assets[0];
            const uri = newImage.fileName
            console.log(uri?.uri)
            console.log("url: ", newImage?.uri)
            setURL(uri);
            http.put("/v1/users/profile", { thumbnailAvatar: newImage?.uri }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => {
                console.log("res", res?.data);
                setThumbnailAvatar(newImage?.uri);
            })
            return uri;
        }
    };

    const pickBackground = async (useLibrary: boolean) => {
        let result = null;
        if (useLibrary) {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                base64: true,
                quality: 1,
            });
        } else {
            await ImagePicker.requestCameraPermissionsAsync();
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                base64: true,
                quality: 1,
            });
        }

        if (!result.canceled) {
            const newImage = result.assets[0];
            const uri = newImage.fileName
            console.log(uri?.uri)
            console.log("url: ", newImage?.uri)
            setURL(uri);
            http.put("/v1/users/profile", { coverImage: newImage?.uri }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => {
                console.log("res", res?.data);
                setCoverImage(newImage?.uri);
            })
            return uri;
        }
    };

    const handleLogout = async () => {
        const requestBody = {
            token : logoutToken
          };
        try {
            const response = await http.post('v1/auth/logout', requestBody
            ).then((response) => {
                console.log(response)
                setMoreInfor(false)
                navigation.navigate("Home")
            }).catch((error) => {
                console.log(error)
            });
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu đăng xuất:', error);
        }
    };

    const handleViewAvatar = () => {
        setShowAvatarOptions(false);
    };

    const getGenderString = () => {
        return gender ? 'Nam' : 'Nữ';
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => setShowCoverOptions(true)}>
                    <Image
                        source={coverImage ? { uri: coverImage } : coverPhoto}
                        style={styles.coverPhoto}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Button, styles.SecondRightButton]} onPress={() => setMoreInfor(true)}>
                    <Image
                        source={require('../../assets/icon/horiz.png')}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>

                <View style={styles.middleContent}>
                    <View style={styles.avatarContainer}>
                        <TouchableOpacity onPress={() => setShowAvatarOptions(true)}>
                            <Avatar
                                size={100}
                                rounded={true}
                                source={thumbnailAvatar ? { uri: thumbnailAvatar } : defaultAvatar}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.username}>{firstName} {lastName}</Text>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity style={[styles.photoButton, { marginLeft: -10 }]}>
                            <Image
                                source={require('../../assets/icon/img.png')}
                                style={styles.icon}
                            />
                            <Text style={styles.buttonText}>Ảnh của tôi</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.photoButton, { marginLeft: 10 }]}>
                            <Image
                                source={require('../../assets/icon/archive.png')}
                                style={styles.icon}
                            />
                            <Text style={styles.buttonText}>Kho Ảnh</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.wallContainer}>
                    <Text style={styles.wallText}>Đây là nhật ký của bạn!</Text>
                </View>
                <View style={{ alignItems: 'center' }} >
                    <TouchableOpacity style={styles.postButton}>
                        <Text style={styles.TextButton}>Đăng lên nhật ký</Text>
                    </TouchableOpacity>
                </View>

                {/* ĐỔI AVATAR */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showAvatarOptions}
                    onRequestClose={() => setShowAvatarOptions(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.optionContainer}>
                            <TouchableOpacity style={styles.optionButton} onPress={() => { pickImage(true), setShowAvatarOptions(false) }}>
                                <Text style={styles.optionText}>Đổi ảnh đại diện</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} onPress={() => setShowAvatarOptions(false)}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: 'red',
                                }}>Hủy thao tác</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* -------------------------- */}
                {/* ĐỔI BACKGROUND */}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showCoverOptions}
                    onRequestClose={() => setShowCoverOptions(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.optionContainer}>
                            <TouchableOpacity style={styles.optionButton} onPress={() => { pickBackground(true), setShowCoverOptions(false) }}>
                                <Text style={styles.optionText}>Đổi ảnh nền</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} onPress={() => setShowCoverOptions(false)}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: 'red',
                                }}>Hủy thao tác</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* HIỆN RIGHT-NAV */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showMoreInfor}
                    onRequestClose={() => setMoreInfor(false)}
                >
                    <View style={styles.modalContainer2}>

                        <View style={styles.optionContainer2}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: -25, marginTop: -5, paddingBottom: 20, color: '#1c70be' }}>{firstName} {lastName}</Text>
                            <TouchableOpacity style={styles.optionButton} onPress={() => {
                                navigation.navigate("ViewProfile", { data: data }), setMoreInfor(false)
                            }} >
                                <Text style={styles.optionText}>Thông tin</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} onPress={() => { pickImage(true), setMoreInfor(false) }}>
                                <Text style={styles.optionText}>Đổi ảnh đại diện</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} onPress={() => { pickBackground(true), setMoreInfor(false) }} >
                                <Text style={styles.optionText}>Đổi ảnh nền</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} >
                                <Text style={styles.optionText}>Cập nhật giới thiệu bản thân</Text>
                            </TouchableOpacity>
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: -25, marginTop: 5, paddingBottom: 20, color: "#1c70be" }}>Cài đặt</Text>
                            </View>
                            <TouchableOpacity style={styles.optionButton} >
                                <Text style={styles.optionText}>Quyền riêng tư</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton}>
                                <Text style={styles.optionText}>Quản lý tài khoản</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} >
                                <Text style={styles.optionText}>Cài đặt chung</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} onPress={() => setMoreInfor(false)}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: 'red',
                                }}>Quay về trang cá nhân</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} onPress={() => handleLogout()} >
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: 'red',
                                }}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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

export default ProfileScreen;