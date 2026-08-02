import React from 'react';

import { View, Text, Button } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {

  return (
    <View>
      <Text>React Native Pattern Playground</Text>

      <Button
        title="Strategy Pattern"
        onPress={() => navigation.navigate('Strategy')}
      />
    </View>
  );
};

export default HomeScreen;
