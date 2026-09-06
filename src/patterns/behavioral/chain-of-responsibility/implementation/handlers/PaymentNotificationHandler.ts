import { Notification } from '../domain/notification';
import { BaseNotificationHandler } from './core/BaseNotificationHandler.ts';
import { NotificationHandler } from './core/NotificationHandler.ts';

export class PaymentNotificationHandler extends BaseNotificationHandler {
  constructor(next?: NotificationHandler) {
    super(next);
  }

  canHandle(notification: Notification): boolean {
    return notification.type === 'payment';
  }

  handleNotification(notification: Notification): string {
    if (notification.type !== 'payment') {
      throw new Error('Invalid notification type.');
    }

    return `Opening payment ${notification.transactionId} (${notification.status})`;
  }
}
