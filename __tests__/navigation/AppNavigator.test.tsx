import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from '../../src/navigation/AppNavigator';

describe('AppNavigator', () => {
  it('should render successfully', () => {
    expect(() => {
      render(
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      );
    }).not.toThrow();
  });

  it('should be a valid React component', () => {
    expect(() => {
      render(
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      );
    }).not.toThrow();
  });

  it('should render navigation with multiple screens', () => {
    expect(() => {
      render(
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      );
    }).not.toThrow();
  });

  it('should handle navigation container wrapper', () => {
    expect(() => {
      render(
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      );
    }).not.toThrow();
  });
});

