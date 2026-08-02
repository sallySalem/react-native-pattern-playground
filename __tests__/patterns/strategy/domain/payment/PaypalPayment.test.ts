import { PaypalPayment } from '../../../../../src/patterns/strategy/domain/payment/PaypalPayment';
import { PaymentResult } from '../../../../../src/patterns/strategy/domain/PaymentResult';

describe('PaypalPayment', () => {
  let paypal: PaypalPayment;

  beforeEach(() => {
    paypal = new PaypalPayment();
  });

  it('should return success payment result', () => {
    const result: PaymentResult = paypal.pay(100);
    expect(result.success).toBe(true);
  });

  it('should return correct payment message', () => {
    const result: PaymentResult = paypal.pay(100);
    expect(result.message).toBe('Paid 100 using PayPal');
  });

  it('should handle different amounts', () => {
    const result: PaymentResult = paypal.pay(75.99);
    expect(result.message).toBe('Paid 75.99 using PayPal');
  });

  it('should implement PaymentStrategy interface', () => {
    expect(typeof paypal.pay).toBe('function');
  });

  it('should handle small amounts', () => {
    const result: PaymentResult = paypal.pay(0.01);
    expect(result.message).toBe('Paid 0.01 using PayPal');
  });

  it('should handle round amounts', () => {
    const result: PaymentResult = paypal.pay(1000);
    expect(result.message).toBe('Paid 1000 using PayPal');
  });
});

