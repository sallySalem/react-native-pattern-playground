import { PaymentStrategy } from '../PaymentStrategy';
import { PaymentResult } from '../PaymentResult';

export class ApplePayPayment implements PaymentStrategy {
  pay(amount: number): PaymentResult {
    return {
      success: true,
      message: `Paid ${amount} using Apple Pay`,
    };
  }
}
