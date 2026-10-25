import type { PaymentProvider } from './PaymentProvider.ts';

export interface PaymentResult {
  success: boolean;
  provider: PaymentProvider;
  amount: number;
  transactionId: string;
  message: string;
}
