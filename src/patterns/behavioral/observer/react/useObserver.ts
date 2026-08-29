import { useSyncExternalStore } from 'react';

//To allow react to listen to changes in observer
interface ObservableObserver {
  subscribe(listener: () => void): () => void;
  getVersion(): number;
}

export function useObserver<T extends ObservableObserver>(observer: T): T {
  useSyncExternalStore(
    observer.subscribe.bind(observer),
    observer.getVersion.bind(observer),
  );

  return observer;
}
