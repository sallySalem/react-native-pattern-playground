import { AuthState } from '../model/AuthState';
import { Observer } from './Observer.ts';
import { ObservableState } from '../support/ObservableState.ts';

export class PaymentObserver implements Observer<AuthState> {
  private enabled = false;

  private readonly observableState = new ObservableState();

  update(data: AuthState): void {
    this.enabled = data.isLoggedIn;

    this.observableState.changed();
  }

  subscribe(listener: () => void): () => void {
    return this.observableState.subscribe(listener);
  }

  getVersion(): number {
    return this.observableState.getVersion();
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}
