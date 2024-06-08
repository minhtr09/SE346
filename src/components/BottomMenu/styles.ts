import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderColor: '#eaeaea',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 60,
    },
    icon: {
      width: 25,
      height: 25,
    },
    modalView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    closeButton: {
      marginTop: 10,
      color: 'blue',
    },
  });