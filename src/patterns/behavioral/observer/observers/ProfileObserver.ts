import { Observer } from '../domain/Observer.ts';
import { AuthState } from '../domain/AuthState.ts';

export class ProfileObserver implements Observer<AuthState> {
  private message = 'Waiting for authentication update';

  update(state: AuthState): void {
    if (state.isLoggedIn) {
      this.message = `Profile updated for ${state.username}`;
      return;
    }
    this.message = 'Profile cleared';
  }

  getMessage(): string {
    return this.message;
  }
}
