import { PaymentResult } from '../PaymentResult.ts';
import { PaymentStrategy } from '../PaymentStrategy.ts';

export class CreditCardPayment implements PaymentStrategy {
  pay(amount: number): PaymentResult {
    return {
      success: true,
      message: `Paid ${amount} using Credit Card`,
    };
  }
}
