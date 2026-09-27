import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import StrategyScreen from '../patterns/behavioral/strategy/demo/StrategyScreen';
import { ObserverScreen } from '../patterns/behavioral/observer/demo/ObserverScreen.tsx';
import { ChainOfResponsibilityScreen } from '../patterns/behavioral/chain-of-responsibility/demo/ChainOfResponsibilityScreen.tsx';
import { DecoratorDemoScreen } from '../patterns/behavioral/decorator/demo/DecoratorDemoScreen.tsx';

export type RootStackParamList = {
  Home: undefined;
  Strategy: undefined;
  Observer: undefined;
  ChainOfResponsibility: undefined;
  Decorator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Strategy" component={StrategyScreen} />
      <Stack.Screen name="Observer" component={ObserverScreen} />
      <Stack.Screen
        name="ChainOfResponsibility"
        component={ChainOfResponsibilityScreen}
      />
      <Stack.Screen name="Decorator" component={DecoratorDemoScreen} />
    </Stack.Navigator>
  );
};
