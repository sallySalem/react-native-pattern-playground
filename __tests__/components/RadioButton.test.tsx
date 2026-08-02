import React from 'react';
import { render } from '@testing-library/react-native';
import RadioButton from '../../src/components/RadioButton';

describe('RadioButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('should render without crashing', () => {
    expect(() => {
      render(
        <RadioButton label="Test Option" selected={false} onPress={mockOnPress} />
      );
    }).not.toThrow();
  });

  it('should render with selected prop true', () => {
    expect(() => {
      render(
        <RadioButton label="Test Option" selected={true} onPress={mockOnPress} />
      );
    }).not.toThrow();
  });

  it('should render with selected prop false', () => {
    expect(() => {
      render(
        <RadioButton label="Test Option" selected={false} onPress={mockOnPress} />
      );
    }).not.toThrow();
  });

  it('should accept different labels', () => {
    expect(() => {
      render(
        <RadioButton label="Credit Card" selected={false} onPress={mockOnPress} />
      );
      render(
        <RadioButton label="PayPal" selected={false} onPress={mockOnPress} />
      );
    }).not.toThrow();
  });

  it('should accept onPress callback', () => {
    expect(() => {
      render(
        <RadioButton label="Test" selected={false} onPress={mockOnPress} />
      );
    }).not.toThrow();
  });
});

