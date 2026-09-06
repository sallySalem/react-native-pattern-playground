import { NotificationHandler } from '../handlers/core/NotificationHandler.ts';
import { Notification } from '../domain/notification.ts';
import { GeneralNotificationHandler } from '../handlers/GeneralNotificationHandler.ts';
import { PaymentNotificationHandler } from '../handlers/PaymentNotificationHandler.ts';
import { ChatNotificationHandler } from '../handlers/ChatNotificationHandler.ts';
import { DeepLinkNotificationHandler } from '../handlers/DeepLinkNotificationHandler.ts';
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
  const general = new GeneralNotificationHandler();

  const payment = new NotificationChain(
    new PaymentNotificationHandler(),
    general,
  );

  const chat = new NotificationChain(new ChatNotificationHandler(), payment);

  const deepLink = new NotificationChain(
    new DeepLinkNotificationHandler(),
    chat,
  );

  return deepLink;
}

export class NotificationChain implements NotificationHandler {
  constructor(
    private readonly current: NotificationHandler,
    private readonly next?: NotificationHandler,
  ) {}

  canHandle(notification: Notification): boolean {
    return this.current.canHandle(notification);
  }

  handle(notification: Notification): string {
    if (this.current.canHandle(notification)) {
      return this.current.handle(notification);
    }

    if (this.next) {
      return this.next.handle(notification);
    }

    return 'Notification was not handled.';
  }
}
