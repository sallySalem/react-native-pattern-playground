import { CheckoutService } from '../../../../src/patterns/strategy/services/CheckoutService';
import { PaymentStrategy } from '../../../../src/patterns/strategy/domain/PaymentStrategy';
import { PaymentResult } from '../../../../src/patterns/strategy/domain/PaymentResult';

describe('CheckoutService', () => {
  let checkoutService: CheckoutService;
  let mockPaymentStrategy: PaymentStrategy;

  beforeEach(() => {
    mockPaymentStrategy = {
      pay: jest.fn().mockReturnValue({
        success: true,
        message: 'Payment successful',
      }),
    };
    checkoutService = new CheckoutService(mockPaymentStrategy);
  });

  it('should call payment strategy with correct amount', () => {
    checkoutService.checkout(100);
    expect(mockPaymentStrategy.pay).toHaveBeenCalledWith(100);
  });

  it('should return payment result from strategy', () => {
    const result = checkoutService.checkout(100);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Payment successful');
  });

  it('should work with different payment amounts', () => {
    checkoutService.checkout(250);
    expect(mockPaymentStrategy.pay).toHaveBeenCalledWith(250);
  });

  it('should handle payment failures', () => {
    const failedResult: PaymentResult = {
      success: false,
      message: 'Payment declined',
    };
    mockPaymentStrategy.pay = jest.fn().mockReturnValue(failedResult);

    const result = checkoutService.checkout(100);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Payment declined');
  });

  it('should accept any PaymentStrategy implementation', () => {
    const customStrategy: PaymentStrategy = {
      pay: jest.fn().mockReturnValue({
        success: true,
        message: 'Custom payment',
      }),
    };

    const service = new CheckoutService(customStrategy);
    const result = service.checkout(50);

    expect(result.message).toBe('Custom payment');
    expect(customStrategy.pay).toHaveBeenCalledWith(50);
  });

  it('should handle multiple checkouts', () => {
    checkoutService.checkout(100);
    checkoutService.checkout(200);
    checkoutService.checkout(300);

    expect(mockPaymentStrategy.pay).toHaveBeenCalledTimes(3);
    expect(mockPaymentStrategy.pay).toHaveBeenNthCalledWith(1, 100);
    expect(mockPaymentStrategy.pay).toHaveBeenNthCalledWith(2, 200);
    expect(mockPaymentStrategy.pay).toHaveBeenNthCalledWith(3, 300);
  });
});

