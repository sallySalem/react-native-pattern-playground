import { Observer } from '../domain/Observer.ts';
import { AuthState } from '../domain/AuthState.ts';

export class PaymentObserver implements Observer<AuthState> {
  private currentState: AuthState = {
    isLoggedIn: false,
  };

  update(state: AuthState): void {
    this.currentState = state;
  }

  getState(): AuthState {
    return this.currentState;
  }
}
