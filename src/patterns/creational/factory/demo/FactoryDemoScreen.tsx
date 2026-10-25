import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { CheckoutService } from '../implementation/Simple-factory/Services/CheckoutService.ts';
import type { PaymentProvider } from '../implementation/Simple-factory/domain/PaymentProvider.ts';
import type { PaymentResult } from '../implementation/Simple-factory/domain/PaymentResult.ts';

const checkoutService = new CheckoutService();

export function FactoryDemoScreen() {
  const [provider, setProvider] = useState<PaymentProvider>('card');
  const [amount, setAmount] = useState('49.99');
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const parsedAmount = Number(amount);

      const paymentResult = await checkoutService.checkout(
        provider,
        parsedAmount,
      );

      setResult(paymentResult);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : 'Something went wrong.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>CREATIONAL DESIGN PATTERN</Text>
        <Text style={styles.title}>Simple Factory</Text>

        <Text style={styles.description}>
          Choose a payment provider. The factory creates the matching processor,
          and the checkout service executes the payment.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Payment provider</Text>

          <View style={styles.providerRow}>
            <ProviderOption
              label="Credit Card"
              selected={provider === 'card'}
              onPress={() => {
                setProvider('card');
                setResult(null);
                setError(null);
              }}
            />

            <ProviderOption
              label="PayPal"
              selected={provider === 'paypal'}
              onPress={() => {
                setProvider('paypal');
                setResult(null);
                setError(null);
              }}
            />
          </View>

          <Text style={styles.label}>Amount (€)</Text>

          <TextInput
            accessibilityLabel="Payment amount in euros"
            value={amount}
            onChangeText={value => {
              setAmount(value);
              setResult(null);
              setError(null);
            }}
            keyboardType="decimal-pad"
            placeholder="Enter amount"
            style={styles.input}
          />

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Execute payment"
            disabled={loading}
            onPress={handleCheckout}
            style={({ pressed }) => [
              styles.payButton,
              pressed && styles.payButtonPressed,
              loading && styles.disabledButton,
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.payButtonText}>Execute Payment</Text>
            )}
          </Pressable>
        </View>

        {result && (
          <View
            accessibilityLiveRegion="polite"
            style={[
              styles.resultCard,
              result.success ? styles.successCard : styles.failureCard,
            ]}
          >
            <Text style={styles.resultTitle}>
              {result.success ? 'Payment successful' : 'Payment failed'}
            </Text>

            <ResultRow label="Provider" value={result.provider} />
            <ResultRow label="Amount" value={`€${result.amount.toFixed(2)}`} />
            <ResultRow label="Transaction ID" value={result.transactionId} />

            <Text style={styles.resultMessage}>{result.message}</Text>
          </View>
        )}

        {error && (
          <View
            accessibilityLiveRegion="polite"
            style={[styles.resultCard, styles.failureCard]}
          >
            <Text style={styles.resultTitle}>Unable to complete payment</Text>
            <Text style={styles.resultMessage}>{error}</Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

type ProviderOptionProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function ProviderOption({ label, selected, onPress }: ProviderOptionProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.providerOption, selected && styles.providerOptionSelected]}
    >
      <Text
        style={[
          styles.providerOptionText,
          selected && styles.providerOptionTextSelected,
        ]}
      >
        {selected ? '●  ' : '○  '}
        {label}
      </Text>
    </Pressable>
  );
}

type ResultRowProps = {
  label: string;
  value: string;
};

function ResultRow({ label, value }: ResultRowProps) {
  return (
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>{label}</Text>
      <Text selectable style={styles.resultValue}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#5265C4',
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#172033',
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    color: '#596579',
    marginTop: 10,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E4E8F0',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#263248',
    marginBottom: 10,
  },
  providerRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22,
  },
  providerOption: {
    flex: 1,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#D9DFEA',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  providerOptionSelected: {
    borderColor: '#5265C4',
    backgroundColor: '#EEF0FF',
  },
  providerOptionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#596579',
  },
  providerOptionTextSelected: {
    color: '#3546A6',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D9DFEA',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 17,
    color: '#172033',
    backgroundColor: '#FFFFFF',
    marginBottom: 18,
  },
  payButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#5265C4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonPressed: {
    opacity: 0.85,
  },
  disabledButton: {
    opacity: 0.65,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  resultCard: {
    marginTop: 18,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
  },
  successCard: {
    backgroundColor: '#EFFAF3',
    borderColor: '#B8E7C8',
  },
  failureCard: {
    backgroundColor: '#FFF2F0',
    borderColor: '#F0C3BD',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#172033',
    marginBottom: 14,
  },
  resultRow: {
    marginBottom: 12,
  },
  resultLabel: {
    fontSize: 12,
    color: '#657187',
    marginBottom: 3,
  },
  resultValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#263248',
  },
  resultMessage: {
    fontSize: 14,
    lineHeight: 21,
    color: '#39465A',
    marginTop: 6,
  },
});
