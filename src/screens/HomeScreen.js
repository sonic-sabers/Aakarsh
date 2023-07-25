import React from 'react';
import { View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const navigateToARScreen = () => {
    navigation.navigate('AR');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }} />
      <Button title="Start AR" onPress={navigateToARScreen} />
    </View>
  );
};

export default HomeScreen;
