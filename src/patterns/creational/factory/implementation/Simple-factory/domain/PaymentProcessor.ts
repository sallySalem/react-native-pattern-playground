import type { PaymentResult } from './PaymentResult';

export interface PaymentProcessor {
  pay(amount: number): Promise<PaymentResult>;
}
