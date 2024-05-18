import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import ArrowIcon from '../../assets/icon/ArrowIcon';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import http from '../../utils/http';
import { useQueryClient } from '@tanstack/react-query';

const ResultFindProfile = ({ navigation, route }) => {
    const { data } = route.params;
    const [coverPhoto, setCoverPhoto] = useState(require("../../assets/profileTest/wall3.jpg"));
    const [firstName, setFirstName] = useState(data.firstName);
    const [lastName, setLastName] = useState(data.lastName);
    const [birthday, setBirthday] = useState(data.birthday);
    const [gender, setGender] = useState(data.gender);
    const [thumbnailAvatar, setThumbnailAvatar] = useState(data.thumbnailAvatar);
    const [showMoreInfor, setMoreInfor] = useState(false);
    const [showInformation, setInformation] = useState(false);
    const defaultAvatar = require('../../assets/profileTest/defaultAVT.jpg');
    const [coverImg, setCoverImg] = useState(data.coverImage);
    const queryClient = useQueryClient();
    const token = queryClient.getQueryData(["dataLogin"])["accessToken"];
    const [isFriend, setIsFriend] = useState(false);
    const getGenderString = () => {
        return gender ? 'Nam' : 'Nữ';
    };
    const phoneNumber = data.phone;
    console.log(phoneNumber);
    useEffect(() => {
        getListFriend();
    }, []);


const getListFriend = async () => {
    try {
        const response = await http.get(`/v1/users/profile/friends`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                type: "friend",
            }
        });
        const data1 = response.data;
        console.log('Danh sách bạn bè', data1);
        data1.forEach((friend) => {
            if (friend.status === "FRIEND" && friend.profile.id === data.id) {
                setIsFriend(true);
            }
        });
    } catch (error) {
        console.error('Lỗi khi lấy thông tin bạn bè:', error.message);
    }
};



    const handleAddFriend = async () => {
        try {
            const body = {
                phone: phoneNumber,
            };
            await http.post(`/v1/users/profile/friends/by-phone`, body, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                const data = res.data;
                console.log('Gửi kết bạn thành công', data);
                setIsFriend(true);
            }).catch((error) => {
                console.log('Error in request:', error);
            });
        } catch (error) {
            console.error('Catch error:', error.message);
        }
    };

    return (
        <ScrollView style={[styles.container, { marginTop: 40 }]}>
            <Image
                source={coverImg ? { uri: coverImg } : coverPhoto}
                style={styles.coverPhoto}
            />

            <TouchableOpacity style={[styles.Button, styles.FisrtRightButton]} onPress={() => navigation.goBack()}>
                <ArrowIcon width={30} height={30} color="#1a1a1a" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.Button, styles.SecondRightButton]} onPress={() => setMoreInfor(true)}>
                <Image
                    source={require('../../assets/icon/horiz.png')}
                    style={styles.backIcon}
                />
            </TouchableOpacity>

            <View style={styles.middleContent}>
                <View style={styles.avatarContainer}>
                    <Avatar
                        size={100}
                        rounded={true}
                        source={thumbnailAvatar ? { uri: thumbnailAvatar } : defaultAvatar}
                    />
                    <Text style={styles.username}>{firstName} {lastName}</Text>
                </View>

                <View style={styles.ButtonContainer}>
                    <TouchableOpacity onPress={() => getListFriend()} style={styles.postButton}>
                        <Text style={styles.TextButton}>Nhắn tin</Text>
                    </TouchableOpacity>
                    {!isFriend && (
                        <TouchableOpacity onPress={handleAddFriend}>
                            <View style={{ marginLeft: 5, width: 50, height: 40, borderRadius: 50, borderWidth: 1, borderColor: "#009bf8", justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name="user-plus" size={30} color="#009bf8" />
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <View style={{ alignItems: 'center' }}></View>

            {/* Modal hoặc component hiển thị tab nhỏ */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showMoreInfor}
                onRequestClose={() => setMoreInfor(false)}
            >
                <View style={styles.modalContainer2}>
                    <View style={styles.optionContainer2}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: -25, marginTop: -5, paddingBottom: 20, color: '#1c70be' }}>{firstName} {lastName}</Text>
                        <TouchableOpacity style={styles.optionButton} onPress={() => { setInformation(true); setMoreInfor(false); }}>
                            <Text style={styles.optionText}>Thông tin</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionText}>Đổi tên gợi nhớ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionText}>Thêm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionText}>Báo xấu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionText}>Quản lý chặn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => setMoreInfor(false)}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}>Quay về</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* MODAL THÔNG TIN */}
            <Modal
                visible={showInformation}
                animationType="slide"
                onRequestClose={() => setInformation(false)}
            >
                <View style={{ marginTop: 30, flex: 1 }}>
                    <View>
                        <Image
                            source={coverPhoto}
                            style={styles.coverPhoto}
                        />
                        <TouchableOpacity style={[styles.Button, styles.FisrtRightButton]} onPress={() => setInformation(false)}>
                            <ArrowIcon width={30} height={30} color="#1a1a1a" />
                        </TouchableOpacity>
                        <View style={styles.avatarContainer2}>
                            <Avatar
                                size={70}
                                rounded={true}
                                source={thumbnailAvatar ? { uri: thumbnailAvatar } : defaultAvatar}
                            />
                            <Text style={{ alignSelf: 'center', marginLeft: 15, fontSize: 20, fontWeight: 'bold', color: 'white' }}>{data.firstName} {data.lastName}</Text>
                        </View>
                    </View>

                    <View style={styles.profileContainer}>
                        <Text style={{ fontSize: 16 }}>Thông tin cá nhân</Text>
                        <Text style={styles.profileText}>Giới tính:               {getGenderString()}</Text>
                        <Text style={styles.profileText}>Ngày sinh:            {birthday}</Text>
                        <View>
                            <Text style={styles.profileText}>Điện thoại:           {phoneNumber}</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
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
        alignItems: 'flex-start',
        marginTop: -80,
        flexDirection: 'row',
        marginLeft: 10,
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
    postButton: {
        width: 250,
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
    modalContainer2: {
        position: 'absolute',
        right: 0,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginTop: 40
    },
    optionContainer2: {
        backgroundColor: '#fff',
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginTop: 4
    },
    optionButton: {
        backgroundColor: '#eee',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        borderColor: 'black',
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

export default ResultFindProfile;
