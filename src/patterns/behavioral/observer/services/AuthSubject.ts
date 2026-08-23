import { Subject } from '../domain/Subject.ts';
import { AuthState } from '../domain/AuthState.ts';
import { Observer } from '../domain/Observer.ts';

export class AuthSubject implements Subject<AuthState> {
  private observers: Observer<AuthState>[] = []; // compose any number of observers with the subject at runtime -- RunTime Composition.

  private state: AuthState = { isLoggedIn: false };

  notify(): void {
    this.observers.forEach(observer => observer.update(this.state));
  }

  subscribe(observer: Observer<AuthState>): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer<AuthState>): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  login(username: string): void {
    this.state = {
      isLoggedIn: true,
      username: username,
    };

    this.notify();
  }

  logout(): void {
    this.state = {
      isLoggedIn: false,
      username: '',
    };

    this.notify();
  }
}
