import { Notification } from '../domain/notification';
import { BaseNotificationHandler } from './core/BaseNotificationHandler.ts';
import { NotificationHandler } from './core/NotificationHandler.ts';

export class GeneralNotificationHandler extends BaseNotificationHandler {
  constructor(next?: NotificationHandler) {
    super(next);
  }

  canHandle(notification: Notification): boolean {
    return notification.type === 'general';
  }

  handleNotification(notification: Notification): string {
    if (notification.type !== 'general') {
      throw new Error('Invalid notification type.');
    }

    return `Showing notification: ${notification.title} - ${notification.message}`;
  }
}
