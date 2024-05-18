import { backgroundChat, backgroundHeader, white } from "../../assets/colors";
import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    object: {
        backgroundColor: white,
        flexDirection: "row",
        paddingLeft: 5,
        borderBottomColor: "black",
        borderBottomWidth: 0.2,
        height: 60,
        alignItems: "center", 
        marginTop:5
    }, 
    icon: {
        backgroundColor: "#E3E3E3",
        borderRadius: 40,
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        marginRight:10
    },
    containerListGroup:{
        flex:1,
    }
})

export default styles