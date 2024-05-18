import { backgroundChat, backgroundHeader, white } from "../../assets/colors";
import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  reverseContent: {
    flexDirection: 'column-reverse', // Reverse the order of elements
  },
  bodyChat: {
    backgroundColor: backgroundChat,
    transform: [{ scaleY: -1 }]

  },
  header: {
    backgroundColor: backgroundHeader,
    flexDirection: "row",
    paddingTop: "12%",
    paddingBottom: "3%",
    justifyContent: "flex-start",
  },
  rowContainer: {
    flexDirection: "row",
    marginStart: "2%",
  },
  headerText: {
    fontSize: 18,
    marginLeft: "5%",
    marginTop: "2%",
    color: "#ffffff",
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "78%",
  },
  icon: {
    marginLeft: 5
  },
  // footer (input chat)
  chat: {
    paddingBottom: 30,
    backgroundColor: white,
    flexDirection: "row",
    justifyContent: "flex-end",
    
  },
  input: {
    flex:1,
    backgroundColor: white,
    borderWidth: 0,
    height: 50,
    fontSize: 18,
    marginLeft: "5%",
    marginTop:10

  },
  defaultInput: {
    paddingBottom: 30
  },
  focusedInput: {
    paddingBottom: 0
  },
  inputIcon: {
    flexDirection: "row",
    marginTop: "2%",
    backgroundColor: white,
    justifyContent: "space-between",
    
  },
  inputIncludeText:{
    width:"19%"
    
  },
  inputEmptyText:{
    width:"20%"
  }
})

export default styles