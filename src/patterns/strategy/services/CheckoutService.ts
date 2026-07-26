import { PaymentStrategy } from '../domain/PaymentStrategy.ts';

export class CheckoutService {
  constructor(private paymentStrategy: PaymentStrategy) {}

  checkout(amount: number) {
    return this.paymentStrategy.pay(amount);
  }
}
