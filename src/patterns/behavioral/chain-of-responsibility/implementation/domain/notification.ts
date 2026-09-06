export type Notification =
  | {
      type: 'chat';
      messageId: string;
      senderName: string;
    }
  | {
      type: 'payment';
      transactionId: string;
      status: 'completed' | 'failed';
    }
  | {
      type: 'deep-link';
      url: string;
    }
  | {
      type: 'general';
      title: string;
      message: string;
    };
