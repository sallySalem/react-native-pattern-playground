import { Observer } from '../domain/Observer.ts';
import { AuthState } from '../domain/AuthState.ts';

export class PaymentObserver implements Observer<AuthState> {
  // private currentState: AuthState = {
  //   isLoggedIn: false,
  // };
  private paymentEnabled = false;

  update(state: AuthState): void {
    this.paymentEnabled = state.isLoggedIn;
  }

  isPaymentEnabled(): boolean {
    return this.paymentEnabled;
  }
}
