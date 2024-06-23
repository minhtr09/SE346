import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Frame = () => {
  const handleFavorite = () => {
  };

  const handleShare = () => {
  };

  const handleAdd = () => {
  };

  return (
    <View style={styles.container}>
      <View style={styles.outerFrame}>
        <LinearGradient
          colors={['#6688F2', '#DF6D8B']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.innerFrame}
        />
        <View style={styles.bottomPart}>
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={handleFavorite} style={styles.iconButton}>
              <Image
                source={require('../../assets/icons/favorite.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
              <Image
                source={require('../../assets/icons/share.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAdd} style={styles.iconButton}>
              <Image
                source={require('../../assets/icons/more.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerFrame: {
    width: 330,
    height: 393,
    borderRadius: 15,
    backgroundColor: '#323344',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  innerFrame: {
    width: 260,
    height: 232,
    borderRadius: 10,
  },
  bottomPart: {
    width: 173,
    height: 63,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default Frame;
