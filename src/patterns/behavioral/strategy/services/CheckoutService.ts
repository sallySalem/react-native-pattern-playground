import { PaymentStrategy } from '../domain/PaymentStrategy.ts';
import { PaymentResult } from '../domain/PaymentResult.ts';

export class CheckoutService {
  constructor(private paymentStrategy: PaymentStrategy) {}

  checkout(amount: number): PaymentResult {
    return this.paymentStrategy.pay(amount);
  }
}
