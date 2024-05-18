import { backgroundChat, backgroundHeader, white } from "../../assets/colors";
import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center", backgroundColor: white,
        marginBottom: 10
    },
    icon: {
        borderRadius: 8,
        backgroundColor: backgroundHeader,
        alignSelf: "flex-start",
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginRight: "3%"
    },
    listFriend: {

    },
    container: {
        flex: 1,
        padding: 16,
    },
    sectionHeader: {
        backgroundColor: white,
        padding: 10,
    },
    sectionHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',

    },
    contactItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    object:{
        height:60,
        justifyContent:"flex-start",
        borderBottomWidth:0.2,
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:white
    },
    img:{
        width:45,
        height:45,
        borderRadius:40,
        marginHorizontal:"2%"
    }
})

export default styles