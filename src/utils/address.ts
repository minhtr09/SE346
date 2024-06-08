import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';

export const getAddress = async (): Promise<string> => {
  let storedAddress = await AsyncStorage.getItem('device_address');
  if (!storedAddress) {
    storedAddress = uuidv4();
    await AsyncStorage.setItem('device_address', storedAddress);
    const userDocRef = doc(FIRESTORE_DB, 'users', storedAddress);
    await setDoc(userDocRef, {
      address: storedAddress,
      score: 0,
    });
  }
  return storedAddress;
};
