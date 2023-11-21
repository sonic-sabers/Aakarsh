import React from 'react';
import { View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const navigateToARScreen = () => {
    navigation.navigate('BlLogo');
  };

  return (
    <View style={{ flex: 1, paddign: 20 }}>
      <View style={{ flex: 1, paddingBottom: 40 }} />
      <Button title="Start AR" onPress={() => navigation.navigate('BlLogo')} />
    </View>
  );
};

export default HomeScreen;
