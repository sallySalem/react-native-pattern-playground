import { PaymentStrategy } from '../PaymentStrategy.ts';
import { PaymentResult } from '../PaymentResult.ts';

export class ApplePayPayment implements PaymentStrategy {
  pay(amount: number): PaymentResult {
    return {
      success: true,
      message: `Paid ${amount} using Apple Pay`,
    };
  }
}
