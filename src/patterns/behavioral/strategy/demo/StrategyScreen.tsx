import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { CheckoutService } from '../services/CheckoutService.ts';
import { PaymentType } from '../domain/PaymentType.ts';
import { PaymentStrategyFactory } from '../factories/PaymentStrategyFactory.ts';

const StrategyScreen = () => {
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentType>('creditCard');
  const [result, setResult] = useState<string>('');

  const handlePayment = () => {
    const paymentStrategy = PaymentStrategyFactory.create(selectedPayment);
    const checkout = new CheckoutService(paymentStrategy);
    const paymentResult = checkout.checkout(100);
    setResult(paymentResult.message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Strategy Pattern Demo</Text>

      <Text style={styles.subtitle}>Choose Payment Method</Text>

      <View style={styles.radioContainer}>
        <Text
          style={[
            styles.radioButton,
            selectedPayment === 'creditCard' && styles.radioButtonSelected,
          ]}
          onPress={() => setSelectedPayment('creditCard')}
        >
          {selectedPayment === 'creditCard' ? '●' : '○'} Credit Card
        </Text>

        <Text
          style={[
            styles.radioButton,
            selectedPayment === 'paypal' && styles.radioButtonSelected,
          ]}
          onPress={() => setSelectedPayment('paypal')}
        >
          {selectedPayment === 'paypal' ? '●' : '○'} PayPal
        </Text>

        <Text
          style={[
            styles.radioButton,
            selectedPayment === 'applePay' && styles.radioButtonSelected,
          ]}
          onPress={() => setSelectedPayment('applePay')}
        >
          {selectedPayment === 'applePay' ? '●' : '○'} Apple Pay
        </Text>
      </View>

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
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: '600',
  },

  radioContainer: {
    marginBottom: 20,
  },

  radioButton: {
    fontSize: 16,
    marginVertical: 10,
    padding: 10,
    borderRadius: 4,
  },

  radioButtonSelected: {
    backgroundColor: '#f0f0f0',
    fontWeight: '600',
  },

  selectedText: {
    marginVertical: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  result: {
    marginTop: 25,
    fontSize: 16,
    padding: 15,
    backgroundColor: '#e8f5e9',
    borderRadius: 4,
    color: '#2e7d32',
  },
});

export default StrategyScreen;
