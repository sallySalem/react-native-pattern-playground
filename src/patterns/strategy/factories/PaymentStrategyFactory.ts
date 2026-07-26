import { PaymentStrategy } from '../domain/PaymentStrategy';
import { PaymentType } from '../domain/PaymentType';
import { CreditCardPayment } from '../domain/payment/CreditCardPayment';
import { PaypalPayment } from '../domain/payment/PaypalPayment';
import { ApplePayPayment } from '../domain/payment/ApplePayPayment';

export class PaymentStrategyFactory {
  static create(type: PaymentType): PaymentStrategy {
    switch (type) {
      case 'creditCard':
        return new CreditCardPayment();

      case 'paypal':
        return new PaypalPayment();

      case 'applePay':
        return new ApplePayPayment();

      default:
        throw new Error(`Unsupported payment type ${type}`);
    }
  }
}
