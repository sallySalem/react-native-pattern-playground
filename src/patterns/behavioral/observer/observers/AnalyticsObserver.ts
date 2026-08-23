import { AuthState } from '../domain/AuthState.ts';
import { Observer } from '../domain/Observer.ts';

export class AnalyticsObserver implements Observer<AuthState> {
  private lastTrackedState: AuthState = {
    isLoggedIn: false,
  };

  update(state: AuthState): void {
    this.lastTrackedState = state;
  }

  getState(): AuthState {
    return this.lastTrackedState;
  }
}
