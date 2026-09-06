import { Notification } from '../domain/notification';
import { NotificationHandler } from './core/NotificationHandler.ts';
import { NotificationHandlingResult } from './core/NotificationHandlingResult.ts';

export class PaymentNotificationHandler implements NotificationHandler {
  canHandle(notification: Notification): boolean {
    return notification.type === 'payment';
  }

  handle(notification: Notification): NotificationHandlingResult {
    if (!this.canHandle(notification)) {
      return { handled: false };
    }

    return {
      handled: true,
      action: 'open-payment',
    };
  }
}
