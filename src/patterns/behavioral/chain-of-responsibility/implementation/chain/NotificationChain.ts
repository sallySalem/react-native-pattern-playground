import { NotificationHandler } from '../handlers/core/NotificationHandler.ts';
import { Notification } from '../domain/notification.ts';
import { GeneralNotificationHandler } from '../handlers/GeneralNotificationHandler.ts';
import { PaymentNotificationHandler } from '../handlers/PaymentNotificationHandler.ts';
import { ChatNotificationHandler } from '../handlers/ChatNotificationHandler.ts';
import { DeepLinkNotificationHandler } from '../handlers/DeepLinkNotificationHandler.ts';
import { NotificationHandlingResult } from '../handlers/core/NotificationHandlingResult.ts';
// export function createNotificationChain(): NotificationHandler {
//   const deeplinkHandler = new DeepLinkNotificationHandler();
//
//   const paymentHandler = new PaymentNotificationHandler(deeplinkHandler);
//
//   const chatHandler = new ChatNotificationHandler(paymentHandler);
//
//   return new GeneralNotificationHandler(chatHandler);
// }
export function createNotificationChain(): NotificationHandler {
  return new NotificationChain([
    new DeepLinkNotificationHandler(),
    new ChatNotificationHandler(),
    new PaymentNotificationHandler(),
    new GeneralNotificationHandler(),
  ]);
}

export class NotificationChain implements NotificationHandler {
  constructor(private readonly handlers: NotificationHandler[]) {}

  handle(notification: Notification): NotificationHandlingResult {
    for (const handler of this.handlers) {
      const result = handler.handle(notification);

      if (result.handled) {
        return result;
      }
    }

    return { handled: false };
  }
}
