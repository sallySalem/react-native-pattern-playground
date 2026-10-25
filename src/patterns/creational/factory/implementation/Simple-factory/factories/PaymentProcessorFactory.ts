import type { PaymentProcessor } from '../domain/PaymentProcessor';
import type { PaymentProvider } from '../domain/PaymentProvider';

import { CardPaymentProcessor } from '../processors/CardPaymentProcessor';
import { PayPalPaymentProcessor } from '../processors/PaypalPaymentProcessor';
export class PaymentProcessorFactory {
  static create(provider: PaymentProvider): PaymentProcessor {
    switch (provider) {
      case 'card':
        return new CardPaymentProcessor();

      case 'paypal':
        return new PayPalPaymentProcessor();

      default: {
        const unsupportedProvider: never = provider;
        throw new Error(`Unsupported payment provider: ${unsupportedProvider}`);
      }
    }
  }
}
