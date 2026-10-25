import type { PaymentProvider } from '../domain/PaymentProvider';
import type { PaymentResult } from '../domain/PaymentResult';
import { PaymentProcessorFactory } from '../factories/PaymentProcessorFactory.ts';

export class CheckoutService {
  async checkout(
    provider: PaymentProvider,
    amount: number,
  ): Promise<PaymentResult> {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error('Please enter an amount greater than zero.');
    }

    const processor = PaymentProcessorFactory.create(provider);

    return processor.pay(amount);
  }
}
