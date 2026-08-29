import { AuthState } from '../model/AuthState';
import { Observer } from '../observers/Observer.ts';
import { Subject } from './Subject.ts';

export class AuthSubject implements Subject<AuthState> {
  private readonly observers: Observer<AuthState>[] = [];

  private state: AuthState = {
    isLoggedIn: false,
  };

  subscribe(observer: Observer<AuthState>): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer<AuthState>): void {
    const index = this.observers.indexOf(observer);

    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(): void {
    this.observers.forEach(observer => {
      observer.update(this.state);
    });
  }

  login(username: string): void {
    this.state = {
      isLoggedIn: true,
      username,
    };

    this.notify();
  }

  logout(): void {
    this.state = {
      isLoggedIn: false,
    };

    this.notify();
  }

  getState(): AuthState {
    return this.state;
  }
}
