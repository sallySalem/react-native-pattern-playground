import React, { useEffect, useMemo } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { AuthSubject } from '../subject/AuthSubject';

import { ProfileObserver } from '../observers/ProfileObserver';
import { AnalyticsObserver } from '../observers/AnalyticsObserver';
import { PaymentObserver } from '../observers/PaymentObserver';

import { useObserver } from '../react/useObserver';

export function ObserverScreen() {
  const subject = useMemo(() => new AuthSubject(), []);

  const profileObserver = useMemo(() => new ProfileObserver(), []);
  const analyticsObserver = useMemo(() => new AnalyticsObserver(), []);
  const paymentObserver = useMemo(() => new PaymentObserver(), []);

  const profile = useObserver(profileObserver);
  const analytics = useObserver(analyticsObserver);
  const payment = useObserver(paymentObserver);

  useEffect(() => {
    subject.subscribe(profileObserver);
    subject.subscribe(analyticsObserver);
    subject.subscribe(paymentObserver);

    return () => {
      subject.unsubscribe(profileObserver);
      subject.unsubscribe(analyticsObserver);
      subject.unsubscribe(paymentObserver);
    };
  }, [subject, profileObserver, analyticsObserver, paymentObserver]);

  const handleLogin = () => {
    subject.login('Sally');
  };

  const handleLogout = () => {
    subject.logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Observer Pattern</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>Authentication</Text>

        <Button title="Login" onPress={handleLogin} />

        <Button title="Logout" onPress={handleLogout} />
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Observer Updates</Text>

        <Text>Profile: {profile.getMessage()}</Text>

        <Text>Analytics: {analytics.getLastEvent()}</Text>

        <Text>Payment: {payment.isEnabled() ? 'Enabled' : 'Disabled'}</Text>
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

  heading: {
    fontSize: 18,
    fontWeight: '600',
  },
});
