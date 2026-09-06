export type NotificationHandlingResult =
  | {
      handled: true;
      action: 'open-chat';
    }
  | {
      handled: true;
      action: 'open-payment';
    }
  | {
      handled: true;
      action: 'open-deep-link';
    }
  | {
      handled: true;
      action: 'show-general';
    }
  | {
      handled: false;
    };
