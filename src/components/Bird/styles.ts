import { StyleSheet } from "react-native";

export const styles = ({xBody, yBody, widthBody, heightBody, color}) => StyleSheet.create({
    bird: {
        position: 'absolute',
        left: xBody,
        right: yBody,
        width: widthBody,
        height: heightBody,
        resizeMode: 'contain'
    }
})
