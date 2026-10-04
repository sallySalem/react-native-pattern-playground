import { ApiService } from '../ApiService.ts';
import { Logger } from '../Logger.ts';

export class LoggingDecorator implements ApiService {
  constructor(
    private readonly service: ApiService,
    private readonly logger: Logger,
  ) {}

  async request(): Promise<string> {
    this.logger.log('Logging → request started');

    const result = await this.service.request();

    this.logger.log('Logging → request finished');

    return result;
  }
}
