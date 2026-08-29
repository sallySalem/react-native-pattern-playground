import { ListenerRegistry } from './ListenerRegistry.ts';

export class ObservableState {
  private version = 0;

  private readonly listeners = new ListenerRegistry();

  subscribe(listener: () => void): () => void {
    return this.listeners.subscribe(listener);
  }

  getVersion(): number {
    return this.version;
  }

  changed(): void {
    this.version += 1;
    this.listeners.notify();
  }
}
