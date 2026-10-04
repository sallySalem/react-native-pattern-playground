import { AnalyticsDecorator } from '../implementation/decorators/AnalyticsDecorator.ts';
import { LoggingDecorator } from '../implementation/decorators/LoggingDecorator.ts';
import { RetryDecorator } from '../implementation/decorators/RetryDecorator.ts';
import { InMemoryLogger } from '../implementation/InMemoryLogger.ts';
import { UserApiService } from '../implementation/UserApiService.ts';

import { DemoApiService, DemoScenario } from './DemoApiService.ts';

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
