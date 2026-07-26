import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import RadioButton from '../../../components/RadioButton';
import { CheckoutService } from '../services/CheckoutService';
import { PaymentType } from '../domain/PaymentType.ts';
import { PaymentStrategyFactory } from '../factories/PaymentStrategyFactory.ts';

const StrategyScreen = () => {
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentType>('creditCard');

  const [result, setResult] = useState<string>('');

  const handlePayment = () => {

    const paymentStrategy = PaymentStrategyFactory.create(selectedPayment);

    const checkout = new CheckoutService(paymentStrategy!);

    const paymentResult = checkout.checkout(100);

    setResult(paymentResult.message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Strategy Pattern Demo</Text>

      <Text style={styles.subtitle}>Choose Payment Method</Text>

      <RadioButton
        label="Credit Card"
        selected={selectedPayment === 'creditCard'}
        onPress={() => setSelectedPayment('creditCard')}
      />

      <RadioButton
        label="PayPal"
        selected={selectedPayment === 'paypal'}
        onPress={() => setSelectedPayment('paypal')}
      />

      <RadioButton
        label="Apple Pay"
        selected={selectedPayment === 'applePay'}
        onPress={() => setSelectedPayment('applePay')}
      />

      <Text style={styles.selectedText}>
        Selected Strategy: {selectedPayment}
      </Text>

      <Button title="Pay €100" onPress={handlePayment} />

      {result !== '' && <Text style={styles.result}>{result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 18,
    marginBottom: 15,
  },

  selectedText: {
    marginTop: 25,
    marginBottom: 20,
    fontSize: 16,
  },

  result: {
    marginTop: 25,
    fontSize: 18,
  },
});

export default StrategyScreen;
