import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

const BottomMenu = () => {
  // Control showing dialog -> click swap icon
  const [isSwapModalVisible, setSwapModalVisible] = useState(false);

  const toggleSwapModal = () => {
    setSwapModalVisible(!isSwapModalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => {}}>
        <Ionicons name = "cart-outline" size={30} color="black" />
        <Text>Store</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={toggleSwapModal}>
        <Ionicons name="swap-horizontal-outline" size={30} color="black" />
        <Text>Swap</Text>
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