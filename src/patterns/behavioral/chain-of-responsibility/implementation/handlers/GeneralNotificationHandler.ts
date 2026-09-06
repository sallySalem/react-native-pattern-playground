import { Notification } from '../domain/notification';
import { NotificationHandler } from './core/NotificationHandler.ts';

export class GeneralNotificationHandler implements NotificationHandler {
  canHandle(notification: Notification): boolean {
    return notification.type === 'general';
  }

  handle(notification: Notification): string {
    if (notification.type !== 'general') {
      throw new Error('Invalid notification type.');
    }

    return `Showing notification: ${notification.title} - ${notification.message}`;
  }
}
