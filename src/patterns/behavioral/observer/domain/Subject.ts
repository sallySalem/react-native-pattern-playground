import { Observer } from './Observer.ts';

export interface Subject<T> {
  subscribe(observer: Observer<T>): void;

  unsubscribe(observer: Observer<T>): void;

  notify(): void;
}
