import { View, Text,StyleSheet } from "react-native"
import Header from "../components/headerFind"
import  Icon  from "react-native-vector-icons/Ionicons"
import { white, backgroundHeader } from "../../assets/colors"
import BodyContact from "./body"

const ContactScreen = ()=>{
    return(
        <View>
            <BodyContact/>
        </View>
    )
}

export default ContactScreen