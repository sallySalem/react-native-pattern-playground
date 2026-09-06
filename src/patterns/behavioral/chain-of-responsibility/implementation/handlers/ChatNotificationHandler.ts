import { Notification } from '../domain/notification';
import { NotificationHandler } from './core/NotificationHandler.ts';

export class ChatNotificationHandler implements NotificationHandler {
  canHandle(notification: Notification): boolean {
    return notification.type === 'chat';
  }

  handle(notification: Notification): string {
    if (notification.type !== 'chat') {
      throw new Error('Invalid notification type.');
    }

    return `Opening chat with ${notification.senderName}: "${notification.senderName}"`;
  }
}
