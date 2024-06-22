import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      borderColor: '#eaeaea',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 60,
      backgroundColor: '#fff',
      borderTopWidth: 1,
    },
    icon: {
      width: 25,
      height: 25,
    },
    closeButton: {
      marginTop: 10,
      color: 'blue',
    },
  });