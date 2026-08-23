import { PaymentResult } from './PaymentResult.ts';

export interface PaymentStrategy {
  pay(amount: number): PaymentResult;
}
