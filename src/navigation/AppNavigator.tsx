import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import StrategyScreen from '../patterns/behavioral/strategy/demo/StrategyScreen';

export type RootStackParamList = {
  Home: undefined;

  Strategy: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Strategy" component={StrategyScreen} />
    </Stack.Navigator>
  );
};
