import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import { styles } from './styles';

const BottomMenu = () => {
  // Control showing dialog -> click swap icon
  const [isSwapModalVisible, setSwapModalVisible] = useState(false);

  const toggleSwapModal = () => {
    setSwapModalVisible(!isSwapModalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}}>
        <Image source={require('../../assets/icons/store.png')}  style = {styles.icon}></Image>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleSwapModal}>
        <Image source={require('../../assets/icons/swap.png')}  style = {styles.icon}></Image>
      </TouchableOpacity>


      <Modal
        animationType="slide"
        transparent={true}
        visible={isSwapModalVisible}
        onRequestClose={toggleSwapModal}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Swap Dialog</Text>
          <TouchableOpacity onPress={toggleSwapModal}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default BottomMenu;