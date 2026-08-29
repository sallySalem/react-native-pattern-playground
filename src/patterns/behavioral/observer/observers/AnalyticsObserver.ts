import { AuthState } from '../model/AuthState';
import { Observer } from './Observer.ts';
import { ObservableState } from '../support/ObservableState.ts';

export class AnalyticsObserver implements Observer<AuthState> {
  private lastEvent = 'No event tracked';

  private readonly observableState = new ObservableState();

  update(data: AuthState): void {
    this.lastEvent = data.isLoggedIn
      ? `LOGIN event tracked for ${data.username}`
      : 'LOGOUT event tracked';

    this.observableState.changed();
  }

  subscribe(listener: () => void): () => void {
    return this.observableState.subscribe(listener);
  }

  getVersion(): number {
    return this.observableState.getVersion();
  }

  getLastEvent(): string {
    return this.lastEvent;
  }
}
