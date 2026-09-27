import { Logger } from './Logger';

export class InMemoryLogger implements Logger {
  private readonly messages: string[] = [];

  private readonly listeners = new Set<(messages: string[]) => void>();

  log(message: string): void {
    this.messages.push(message);

    this.notify();
  }

  getMessages(): string[] {
    return [...this.messages];
  }

  clear(): void {
    this.messages.length = 0;

    this.notify();
  }

  subscribe(listener: (messages: string[]) => void): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    const snapshot = this.getMessages();

    this.listeners.forEach(listener => {
      listener(snapshot);
    });
  }
}
