import React, { useRef, useState } from 'react';
import { AuthSubject } from '../services/AuthSubject.ts';
import { ProfileObserver } from '../observers/ProfileObserver.ts';
import { AnalyticsObserver } from '../observers/AnalyticsObserver.ts';
import { PaymentObserver } from '../observers/PaymentObserver.ts';
import { Button, StyleSheet, Text, View } from 'react-native';

export function ObserverScreen() {
  const authSubject = useRef(new AuthSubject()).current;

  const profileObserver = useRef(new ProfileObserver()).current;
  const analyticsObserver = useRef(new AnalyticsObserver()).current;
  const paymentObserver = useRef(new PaymentObserver()).current;

  const [, forceUpdate] = useState(0);

  const login = () => {
    authSubject.login('Sally');

    forceUpdate(value => value + 1);
  };

  const logout = () => {
    authSubject.logout();

    forceUpdate(value => value + 1);
  };

  React.useEffect(() => {
    authSubject.subscribe(profileObserver);
    authSubject.subscribe(analyticsObserver);
    authSubject.subscribe(paymentObserver);

    return () => {
      authSubject.unsubscribe(profileObserver);
      authSubject.unsubscribe(analyticsObserver);
      authSubject.unsubscribe(paymentObserver);
    };
  }, [authSubject, profileObserver, analyticsObserver, paymentObserver]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Observer Pattern</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Authentication</Text>

        <Button title="Login" onPress={login} />

        <Button title="Logout" onPress={logout} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Observer Results</Text>

        <Text>Profile: {profileObserver.getMessage()}</Text>

        <Text>Analytics: {analyticsObserver.getLastEvent()}</Text>

        <Text>
          Payment: {paymentObserver.isPaymentEnabled() ? 'Enabled' : 'Disabled'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
  },

  section: {
    gap: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});
