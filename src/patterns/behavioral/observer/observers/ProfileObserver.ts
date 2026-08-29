import { AuthState } from '../model/AuthState';
import { Observer } from './Observer.ts';
import { ObservableState } from '../support/ObservableState.ts';

export class ProfileObserver implements Observer<AuthState> {
  private message = 'Waiting for authentication update';

  private readonly observableState = new ObservableState();

  update(data: AuthState): void {
    if (data.isLoggedIn) {
      this.message = `Profile updated for ${data.username}`;
    } else {
      this.message = 'Profile cleared';
    }

    this.observableState.changed();
  }

  subscribe(listener: () => void): () => void {
    return this.observableState.subscribe(listener);
  }

  getVersion(): number {
    return this.observableState.getVersion();
  }

  getMessage(): string {
    return this.message;
  }
}
