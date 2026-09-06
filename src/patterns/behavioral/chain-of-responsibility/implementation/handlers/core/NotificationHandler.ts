import { Notification } from '../../domain/notification.ts';
import { NotificationHandlingResult } from './NotificationHandlingResult.ts';

export interface NotificationHandler {
  handle(notification: Notification): NotificationHandlingResult;
}
