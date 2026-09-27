import { Logger } from './Logger';

export class InMemoryLogger implements Logger {
  private readonly messages: string[] = [];

  log(message: string): void {
    this.messages.push(message);
  }

  getMessages(): string[] {
    return [...this.messages];
  }

  clear(): void {
    this.messages.length = 0;
  }
}
