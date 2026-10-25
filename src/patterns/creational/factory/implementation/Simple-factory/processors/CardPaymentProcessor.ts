import type { PaymentProcessor } from '../domain/PaymentProcessor';
import type { PaymentResult } from '../domain/PaymentResult';

export class CardPaymentProcessor implements PaymentProcessor {
  async pay(amount: number): Promise<PaymentResult> {
    return {
      success: true,
      provider: 'card',
      amount,
      transactionId: `CARD-${Date.now()}`,
      message: 'Card payment completed successfully.',
    };
  }
}
