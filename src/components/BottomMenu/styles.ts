import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderColor: '#ddd',
      paddingVertical: 10,
    },
    iconContainer: {
      alignItems: 'center',
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