import { ApiService } from '../ApiService';
import { Logger } from '../Logger';

export class RetryDecorator implements ApiService {
  constructor(
    private readonly service: ApiService,
    private readonly logger: Logger,
    private readonly maxRetries = 1,
  ) {}

  async request(): Promise<string> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= this.maxRetries + 1; attempt++) {
      try {
        this.logger.log(`Retry → attempt ${attempt}`);

        return await this.service.request();
      } catch (error) {
        lastError = error;

        this.logger.log(`Retry → attempt ${attempt} failed`);
      }
    }

    throw lastError;
  }
}
