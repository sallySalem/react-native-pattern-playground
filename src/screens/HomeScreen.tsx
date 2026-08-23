import React from 'react';

import { Button, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>React Native Pattern Playground</Text>

      <View style={styles.button}>
        <Button
          title="Strategy Pattern"
          onPress={() => navigation.navigate('Strategy')}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Observer Pattern"
          onPress={() => navigation.navigate('Observer')}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
  },
});
