import { useMemo, useState } from 'react';
import { AuthSubject } from '../services/AuthSubject.ts';
import { ProfileObserver } from '../observers/ProfileObserver.ts';
import { AnalyticsObserver } from '../observers/AnalyticsObserver.ts';
import { PaymentObserver } from '../observers/PaymentObserver.ts';
import { Button, StyleSheet, Text, View } from 'react-native';
import type { AuthState } from '../domain/AuthState.ts';

export function ObserverScreen() {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
  });

  const observers = useMemo(() => {
    const authSubject = new AuthSubject();

    const profileObserver = new ProfileObserver();
    const analyticsObserver = new AnalyticsObserver();
    const paymentObserver = new PaymentObserver();

    authSubject.subscribe(profileObserver);
    authSubject.subscribe(analyticsObserver);
    authSubject.subscribe(paymentObserver);

    return {
      authSubject,
      profileObserver,
      analyticsObserver,
      paymentObserver,
    };
  }, []);

  const handleLogin = () => {
    observers.authSubject.login('Sally');
    // setAuthState(observers.profileObserver.getState());
    setAuthState({
      isLoggedIn: true,
      username: 'Sally',
    });
  };

  const handleLogout = () => {
    observers.authSubject.logout();

    setAuthState({
      isLoggedIn: false,
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Observer Pattern</Text>

      <Text>Status: {authState.isLoggedIn ? 'Logged in' : 'Logged out'}</Text>

      <Button title="Login" onPress={handleLogin} />

      <Button title="Logout" onPress={handleLogout} />

      <Text style={styles.sectionTitle}>Observers</Text>

      <Text>✓ Profile Observer</Text>
      <Text>✓ Analytics Observer</Text>
      <Text>✓ Payment Observer</Text>
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

  sectionTitle: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: '600',
  },
});
