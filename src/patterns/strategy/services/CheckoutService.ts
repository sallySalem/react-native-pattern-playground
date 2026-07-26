import { PaymentStrategy } from '../domain/PaymentStrategy';
import { PaymentResult } from '../domain/PaymentResult';

export class CheckoutService {
  constructor(private paymentStrategy: PaymentStrategy) {}

  checkout(amount: number): PaymentResult {
    return this.paymentStrategy.pay(amount);
  }
}
