import { PaymentResult } from './PaymentResult';

export interface PaymentStrategy {
  pay(amount: number): PaymentResult;
}
