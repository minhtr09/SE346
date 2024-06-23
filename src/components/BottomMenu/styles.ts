import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      borderColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 70,
      backgroundColor: 'white',
      borderTopWidth: 1,
    },
    icon: {
      width: 40,
      height: 40,
    },
    closeButton: {
      marginTop: 10,
      color: 'blue',
    },
  });