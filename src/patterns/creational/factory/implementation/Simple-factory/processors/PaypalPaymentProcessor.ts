import type { PaymentProcessor } from '../domain/PaymentProcessor';
import type { PaymentResult } from '../domain/PaymentResult';

export class PayPalPaymentProcessor implements PaymentProcessor {
  async pay(amount: number): Promise<PaymentResult> {
    return {
      success: true,
      provider: 'paypal',
      amount,
      transactionId: `PAYPAL-${Date.now()}`,
      message: 'PayPal payment completed successfully.',
    };
  }
}
