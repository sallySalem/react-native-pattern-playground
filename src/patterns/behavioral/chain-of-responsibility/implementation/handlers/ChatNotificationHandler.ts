import { Notification } from '../domain/notification';
import { BaseNotificationHandler } from './core/BaseNotificationHandler.ts';
import { NotificationHandler } from './core/NotificationHandler.ts';

export class ChatNotificationHandler extends BaseNotificationHandler {
  constructor(next?: NotificationHandler) {
    super(next);
  }

  canHandle(notification: Notification): boolean {
    return notification.type === 'chat';
  }

  handleNotification(notification: Notification): string {
    if (notification.type !== 'chat') {
      throw new Error('Invalid notification type.');
    }

    return `Opening chat with ${notification.senderName}: "${notification.senderName}"`;
  }
}
