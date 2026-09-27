import { ApiService } from '../implementation/ApiService';
import { Logger } from '../implementation/Logger';

export type DemoScenario = 'success-first' | 'success-second' | 'fail-second';

export class DemoApiService implements ApiService {
  private attempt = 0;

  constructor(
    private readonly service: ApiService,
    private readonly logger: Logger,
    private readonly scenario: DemoScenario,
  ) {}

  async request(): Promise<string> {
    this.attempt++;

    this.logger.log('User API → request');

    if (this.scenario === 'success-second' && this.attempt === 1) {
      throw new Error('Simulated first attempt failure');
    }

    if (this.scenario === 'fail-second') {
      throw new Error(`Simulated API failure on attempt ${this.attempt}`);
    }

    return this.service.request();
  }
}
