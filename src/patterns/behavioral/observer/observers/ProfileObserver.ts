import { Observer } from '../domain/Observer.ts';
import { AuthState } from '../domain/AuthState.ts';

export class ProfileObserver implements Observer<AuthState> {
  private currentUser: AuthState = {
    isLoggedIn: false,
  };

  update(state: AuthState): void {
    this.currentUser = state;
  }

  getState(): AuthState {
    return this.currentUser;
  }
}
