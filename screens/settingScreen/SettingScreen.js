import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Image, ScrollView } from 'react-native';
const SettingScreen = () => {


    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <TouchableOpacity>
                    <Image
                        source={require('../assets/icon/back.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: '#fff', marginLeft: 10 }}>Cài đặt</Text>
                <TouchableOpacity style={{ left: '63%' }}>
                    <Image
                        source={require('../assets/icon/search.png')}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView>

                <TouchableOpacity style={styles.item}>
                    <Image
                        source={require('../assets/icon/shield.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>Tài khoản và bảo mật</Text>
                    <Image
                        source={require('../assets/icon/next_move.png')}
                        style={styles.nextIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <Image
                        source={require('../assets/icon/lock.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>Quyền riêng tư</Text>
                    <Image
                        source={require('../assets/icon/next_move.png')}
                        style={styles.nextIcon}

                    />
                </TouchableOpacity>


                <TouchableOpacity style={styles.item}>
                    <Image
                        source={require('../assets/icon/data.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>Dữ liệu trên máy</Text>
                    <Image
                        source={require('../assets/icon/next_move.png')}
                        style={styles.nextIcon}

                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <Image
                        source={require('../assets/icon/cache.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>Sao lưu khôi phục</Text>
                    <Image
                        source={require('../assets/icon/next_move.png')}
                        style={styles.nextIcon}

                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <Image
                        source={require('../assets/icon/notifications.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>Thông báo</Text>
                    <Image
                        source={require('../assets/icon/next_move.png')}
                        style={styles.nextIcon}

                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <Image
                        source={require('../assets/icon/message.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>Tin nhắn</Text>
                    <Image
                        source={require('../assets/icon/next_move.png')}
                        style={styles.nextIcon}

                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <Image
                        source={require('../assets/icon/phone.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>Cuộc gọi</Text>
                    <Image
                        source={require('../assets/icon/next_move.png')}
                        style={styles.nextIcon}

                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <Image
                        source={require('../assets/icon/history.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>Nhật ký</Text>
                    <Image
                        source={require('../assets/icon/next_move.png')}
                        style={styles.nextIcon}

                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <Image
                        source={require('../assets/icon/phonebook.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>Danh bạ</Text>
                    <Image
                        source={require('../assets/icon/next_move.png')}
                        style={styles.nextIcon}
                    
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <Image
                        source={require('../assets/icon/theme.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>Giao diện và ngôn ngữ</Text>
                    <Image
                        source={require('../assets/icon/next_move.png')}
                        style={styles.nextIcon}

                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Image
                        source={require('../assets/icon/infomation.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>Thông tin về zalo</Text>
                    <Image
                        source={require('../assets/icon/next_move.png')}
                        style={styles.nextIcon}

                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <Image
                        source={require('../assets/icon/help.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>Liên hệ hỗ trợ</Text>
                    <Image
                        source={require('../assets/icon/next_move.png')}
                        style={styles.nextIcon}

                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Image
                        source={require('../assets/icon/account.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>Chuyển tài khoản</Text>
                    <Image
                        source={require('../assets/icon/next_move.png')}
                        style={styles.nextIcon}

                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.footer}>
                    <Image
                        source={require('../assets/icon/logout.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>Đăng xuất</Text>

                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    navbar: {
        height: 50,
        backgroundColor: '#009bf8',
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 10,
    },
    icon2: {
        width: 30,
        height: 30
    },
    text: {
        color: '#000',
        fontSize: 16,
        marginLeft: 10
    },
    footer: {
        textAlign: 'center',
        fontSize: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        height: 50
    },
    nextIcon: {
        position: 'absolute',
        right: 20, 
        width: 24,
        height: 24,
      },
});

export default SettingScreen;
