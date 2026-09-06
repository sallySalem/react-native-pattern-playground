import { Notification } from '../../domain/notification.ts';
import { NotificationHandlingResult } from './NotificationHandlingResult.ts';

export interface NotificationHandler {
  canHandle(notification: Notification): boolean;
  handle(notification: Notification): NotificationHandlingResult;
}
