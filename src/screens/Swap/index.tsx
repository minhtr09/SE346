import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./style";

const Swap = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.box}>
      <Text>Swap Screen</Text>

    </View>
  );
};

export default Swap;
