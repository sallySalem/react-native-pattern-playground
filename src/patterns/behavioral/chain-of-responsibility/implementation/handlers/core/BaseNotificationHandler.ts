import { Notification } from '../../domain/notification.ts';
import { NotificationHandler } from './NotificationHandler.ts';

export abstract class BaseNotificationHandler implements NotificationHandler {
  protected constructor(private readonly next?: NotificationHandler) {}

  abstract canHandle(notification: Notification): boolean;

  abstract handleNotification(notification: Notification): string;

  handle(notification: Notification): string {
    if (this.canHandle(notification)) {
      return this.handleNotification(notification);
    }

    if (this.next) {
      return this.next.handle(notification);
    }

    return 'Notification was not handled.';
  }
}
