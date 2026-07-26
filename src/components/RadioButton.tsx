import React from 'react';

import { Pressable, Text } from 'react-native';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const RadioButton = ({ label, selected, onPress }: Props) => {
  return (
    <Pressable
      onPress={() => {
        console.log('clicked', label);
        onPress();
      }}
    >
      <Text>
        {selected ? '🔘' : '⚪'} {label}
      </Text>
    </Pressable>
  );
};

export default RadioButton;
