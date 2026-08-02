import { CreditCardPayment } from '../../../../../src/patterns/strategy/domain/payment/CreditCardPayment';
import { PaymentResult } from '../../../../../src/patterns/strategy/domain/PaymentResult';

describe('CreditCardPayment', () => {
  let creditCard: CreditCardPayment;

  beforeEach(() => {
    creditCard = new CreditCardPayment();
  });

  it('should return success payment result', () => {
    const result: PaymentResult = creditCard.pay(100);
    expect(result.success).toBe(true);
  });

  it('should return correct payment message', () => {
    const result: PaymentResult = creditCard.pay(100);
    expect(result.message).toBe('Paid 100 using Credit Card');
  });

  it('should handle different amounts', () => {
    const result: PaymentResult = creditCard.pay(500);
    expect(result.message).toBe('Paid 500 using Credit Card');
  });

  it('should implement PaymentStrategy interface', () => {
    expect(typeof creditCard.pay).toBe('function');
  });

  it('should handle decimal amounts', () => {
    const result: PaymentResult = creditCard.pay(99.99);
    expect(result.message).toBe('Paid 99.99 using Credit Card');
  });

  it('should handle large amounts', () => {
    const result: PaymentResult = creditCard.pay(9999.99);
    expect(result.message).toBe('Paid 9999.99 using Credit Card');
  });
});

