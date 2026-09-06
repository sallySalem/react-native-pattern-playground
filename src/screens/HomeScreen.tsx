import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>React Native Pattern Playground</Text>

      <Button
        title="Strategy Pattern"
        onPress={() => navigation.navigate('Strategy')}
      />

      <Button
        title="Observer Pattern"
        onPress={() => navigation.navigate('Observer')}
      />

      <Button
        title="Chain of Responsibility Pattern"
        onPress={() => navigation.navigate('ChainOfResponsibility')}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});
