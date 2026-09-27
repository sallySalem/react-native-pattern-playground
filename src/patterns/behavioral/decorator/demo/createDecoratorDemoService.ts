import { AnalyticsDecorator } from '../implementation/decorators/AnalyticsDecorator';
import { LoggingDecorator } from '../implementation/decorators/LoggingDecorator';
import { RetryDecorator } from '../implementation/decorators/RetryDecorator';
import { InMemoryLogger } from '../implementation/InMemoryLogger';
import { UserApiService } from '../implementation/UserApiService';

import { DemoApiService, DemoScenario } from './DemoApiService';

export const createDecoratorDemoService = (scenario: DemoScenario) => {
  const logger = new InMemoryLogger();

  const userApi = new UserApiService();

  const demoApi = new DemoApiService(userApi, logger, scenario);

  const retryService = new RetryDecorator(demoApi, logger);

  const loggingService = new LoggingDecorator(retryService, logger);

  const analyticsService = new AnalyticsDecorator(loggingService, logger);

  return {
    service: analyticsService,
    logger,
  };
};
