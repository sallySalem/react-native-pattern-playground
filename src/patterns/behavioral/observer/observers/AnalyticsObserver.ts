import { AuthState } from '../domain/AuthState.ts';
import { Observer } from '../domain/Observer.ts';

export class AnalyticsObserver implements Observer<AuthState> {
  private lastEvent = 'No event tracked';

  update(state: AuthState): void {
    this.lastEvent = state.isLoggedIn ? `LOGIN: ${state.username}` : 'LOGOUT';
  }

  getLastEvent(): string {
    return this.lastEvent;
  }
}
