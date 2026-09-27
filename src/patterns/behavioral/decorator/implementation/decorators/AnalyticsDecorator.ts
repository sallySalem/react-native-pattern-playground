import { ApiService } from '../ApiService';
import { Logger } from '../Logger';

export class AnalyticsDecorator implements ApiService {
  constructor(
    private readonly service: ApiService,
    private readonly logger: Logger,
  ) {}

  async request(): Promise<string> {
    this.logger.log('Analytics → request started');

    const result = await this.service.request();

    this.logger.log('Analytics → success');

    return result;
  }
}
