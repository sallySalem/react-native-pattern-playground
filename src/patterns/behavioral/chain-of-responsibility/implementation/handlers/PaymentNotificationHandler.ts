import { Notification } from '../domain/notification';
import { NotificationHandler } from './core/NotificationHandler.ts';

export class PaymentNotificationHandler implements NotificationHandler {
  canHandle(notification: Notification): boolean {
    return notification.type === 'payment';
  }

  handle(notification: Notification): string {
    if (notification.type !== 'payment') {
      throw new Error('Invalid notification type.');
    }

    return `Opening payment ${notification.transactionId} (${notification.status})`;
  }
}
