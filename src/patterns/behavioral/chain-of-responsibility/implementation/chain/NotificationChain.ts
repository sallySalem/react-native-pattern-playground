import { NotificationHandler } from '../handlers/core/NotificationHandler.ts';
import { GeneralNotificationHandler } from '../handlers/GeneralNotificationHandler.ts';
import { PaymentNotificationHandler } from '../handlers/PaymentNotificationHandler.ts';
import { ChatNotificationHandler } from '../handlers/ChatNotificationHandler.ts';
import { DeepLinkNotificationHandler } from '../handlers/DeepLinkNotificationHandler.ts';

export function createNotificationChain(): NotificationHandler {
  const deeplinkHandler = new DeepLinkNotificationHandler();

  const paymentHandler = new PaymentNotificationHandler(deeplinkHandler);

  const chatHandler = new ChatNotificationHandler(paymentHandler);

  return new GeneralNotificationHandler(chatHandler);
}
