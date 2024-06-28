import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { styles } from './styles';

const BottomMenu: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onNavigate("Store")}>
        <Image source={require('../../assets/icons/store.png')}  style = {styles.icon}></Image>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onNavigate("Swap")}>
        <Image source={require('../../assets/icons/swap.png')}  style = {styles.icon}></Image>
      </TouchableOpacity>
    </View>
  );
};

export default BottomMenu;