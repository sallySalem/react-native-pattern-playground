import React, { useMemo, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createNotificationChain } from '../implementation/chain/NotificationChain.ts';
import { Notification } from '../implementation/domain/notification.ts';

export function ChainOfResponsibilityScreen() {
  const chain = useMemo(() => createNotificationChain(), []);

  const [result, setResult] = useState<string>('');

  const handleNotification = (notification: Notification) => {
    const result = chain.handle(notification);

    if (!result.handled) {
      setResult('Notification was not handled.');
      return;
    }

    setResult(`Action: ${result.action}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chain of Responsibility</Text>

      <Text style={styles.subtitle}>Notification Handling Demo</Text>

      <View style={styles.button}>
        <Button
          title="Send Chat Notification"
          onPress={() =>
            handleNotification({
              type: 'chat',
              messageId: '123',
              senderName: 'Sally',
            })
          }
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Send Payment Notification"
          onPress={() =>
            handleNotification({
              type: 'payment',
              transactionId: 'TX-456',
              status: 'completed',
            })
          }
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Send Deep Link Notification"
          onPress={() =>
            handleNotification({
              type: 'deep-link',
              url: 'myapp://profile/123',
            })
          }
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Send General Notification"
          onPress={() =>
            handleNotification({
              type: 'general',
              title: 'Welcome',
              message: 'Welcome to the app!',
            })
          }
        />
      </View>

      {result ? (
        <View style={styles.result}>
          <Text style={styles.resultTitle}>Result</Text>

          <Text>{result}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 16,
  },
  button: {
    marginBottom: 12,
  },
  result: {
    marginTop: 24,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  resultTitle: {
    marginBottom: 8,
    fontWeight: '700',
  },
});
