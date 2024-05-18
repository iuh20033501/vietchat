import { View, Text, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"
import { backgroundHeader, white } from "../../assets/colors"


const Header = ({title}) => {
    const navigation = useNavigation()
    const backNavigation = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.header}>
            <Icon name="left" color="#ffffff" size={30} onPress={backNavigation} />
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    header:{
        justifyContent:"flex-start",
        backgroundColor:backgroundHeader,
        flexDirection:"row",
        paddingTop:"12%",
        alignItems:"center",
        paddingLeft:10
    },
    text:{
        fontSize:18,
        color:white,
        marginLeft:10
    }
})
export default Header