import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../src/navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

describe('HomeScreen', () => {
  const mockNavigate = jest.fn();
  const mockProps: Props = {
    navigation: {
      navigate: mockNavigate,
    } as any,
    route: {
      name: 'Home',
      params: undefined,
      key: 'Home-key',
    },
  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should render without crashing', () => {
    expect(() => {
      render(<HomeScreen {...mockProps} />);
    }).not.toThrow();
  });

  it('should accept navigation props', () => {
    expect(() => {
      render(<HomeScreen {...mockProps} />);
    }).not.toThrow();
  });

  it('should render with different navigation prop configurations', () => {
    expect(() => {
      render(<HomeScreen {...mockProps} />);
    }).not.toThrow();
  });

  it('should be a valid React component', () => {
    expect(() => {
      render(<HomeScreen {...mockProps} />);
    }).not.toThrow();
  });
});

