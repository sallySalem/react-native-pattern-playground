import { Notification } from '../domain/notification';
import { BaseNotificationHandler } from './core/BaseNotificationHandler.ts';
import { NotificationHandler } from './core/NotificationHandler.ts';

export class DeepLinkNotificationHandler extends BaseNotificationHandler {
  constructor(next?: NotificationHandler) {
    super(next);
  }

  canHandle(notification: Notification): boolean {
    return notification.type === 'deep-link';
  }

  handleNotification(notification: Notification): string {
    if (notification.type !== 'deep-link') {
      throw new Error('Invalid notification type.');
    }

    return `Opening deep link: ${notification.url}`;
  }
}
