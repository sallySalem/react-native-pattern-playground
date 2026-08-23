import { ApplePayPayment } from '../../../../../src/patterns/behavioral/strategy/domain/payment/ApplePayPayment';
import { PaymentResult } from '../../../../../src/patterns/behavioral/strategy/domain/PaymentResult';

describe('ApplePayPayment', () => {
  let applePay: ApplePayPayment;

  beforeEach(() => {
    applePay = new ApplePayPayment();
  });

  it('should return success payment result', () => {
    const result: PaymentResult = applePay.pay(100);
    expect(result.success).toBe(true);
  });

  it('should return correct payment message', () => {
    const result: PaymentResult = applePay.pay(100);
    expect(result.message).toBe('Paid 100 using Apple Pay');
  });

  it('should handle different amounts', () => {
    const result: PaymentResult = applePay.pay(250.5);
    expect(result.message).toBe('Paid 250.5 using Apple Pay');
  });

  it('should implement PaymentStrategy interface', () => {
    expect(typeof applePay.pay).toBe('function');
  });

  it('should handle zero amount', () => {
    const result: PaymentResult = applePay.pay(0);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Paid 0 using Apple Pay');
  });

  it('should handle negative amounts', () => {
    const result: PaymentResult = applePay.pay(-50);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Paid -50 using Apple Pay');
  });
});
