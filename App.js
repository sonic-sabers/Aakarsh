
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import ARScreen from './src/screens/ARScreen';
import DroneControlSceneAR from './src/screens/DroneControlSceneAR';
import ARDashboard from './src/screens/ARDashboard';
import BlLogo from './src/screens/BlLogo';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BlLogo" component={BlLogo} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ARDashboard" component={ARDashboard} />
        <Stack.Screen name="DroneControlSceneAR" component={DroneControlSceneAR} />
        <Stack.Screen name="AR" component={ARScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
