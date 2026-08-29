import { Observer } from '../observers/Observer.ts';

export interface Subject<T> {
  subscribe(observer: Observer<T>): void;

  unsubscribe(observer: Observer<T>): void;

  notify(): void;
}
