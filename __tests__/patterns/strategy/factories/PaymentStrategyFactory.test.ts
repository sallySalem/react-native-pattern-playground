import { PaymentStrategyFactory } from '../../../../src/patterns/strategy/factories/PaymentStrategyFactory';
import { CreditCardPayment } from '../../../../src/patterns/strategy/domain/payment/CreditCardPayment';
import { PaypalPayment } from '../../../../src/patterns/strategy/domain/payment/PaypalPayment';
import { ApplePayPayment } from '../../../../src/patterns/strategy/domain/payment/ApplePayPayment';

describe('PaymentStrategyFactory', () => {
  it('should create CreditCardPayment strategy', () => {
    const strategy = PaymentStrategyFactory.create('creditCard');
    expect(strategy).toBeInstanceOf(CreditCardPayment);
  });

  it('should create PaypalPayment strategy', () => {
    const strategy = PaymentStrategyFactory.create('paypal');
    expect(strategy).toBeInstanceOf(PaypalPayment);
  });

  it('should create ApplePayPayment strategy', () => {
    const strategy = PaymentStrategyFactory.create('applePay');
    expect(strategy).toBeInstanceOf(ApplePayPayment);
  });

  it('should throw error for unsupported payment type', () => {
    expect(() => {
      PaymentStrategyFactory.create('bitcoin' as any);
    }).toThrow('Unsupported payment type bitcoin');
  });

  it('should create different instances on each call', () => {
    const strategy1 = PaymentStrategyFactory.create('creditCard');
    const strategy2 = PaymentStrategyFactory.create('creditCard');
    expect(strategy1).not.toBe(strategy2);
  });

  it('should create all payment types without errors', () => {
    const types: Array<'creditCard' | 'paypal' | 'applePay'> = ['creditCard', 'paypal', 'applePay'];
    types.forEach((type) => {
      expect(() => PaymentStrategyFactory.create(type)).not.toThrow();
    });
  });

  it('should return object with pay method', () => {
    const strategy = PaymentStrategyFactory.create('paypal');
    expect(typeof strategy.pay).toBe('function');
  });
});

