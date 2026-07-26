import { PaymentResult } from '../PaymentResult';
import { PaymentStrategy } from '../PaymentStrategy';

export class CreditCardPayment implements PaymentStrategy {
  pay(amount: number): PaymentResult {
    return {
      success: true,
      message: `Paid ${amount} using Credit Card`,
    };
  }
}
