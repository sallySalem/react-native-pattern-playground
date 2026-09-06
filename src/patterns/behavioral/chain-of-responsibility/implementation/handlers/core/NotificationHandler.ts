import { Notification } from '../../domain/notification.ts';

export interface NotificationHandler {
  canHandle(notification: Notification): boolean;
  handle(notification: Notification): string;
}
