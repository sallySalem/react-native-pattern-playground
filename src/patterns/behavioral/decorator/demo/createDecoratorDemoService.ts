import { InMemoryLogger } from '../implementation/InMemoryLogger';
import { UserApiService } from '../implementation/UserApiService.ts';
import { RetryDecorator } from '../implementation/decorators/RetryDecorator.ts';
import { LoggingDecorator } from '../implementation/decorators/LoggingDecorator.ts';
import { AnalyticsDecorator } from '../implementation/decorators/AnalyticsDecorator.ts';

export const createDecoratorDemoService = () => {
  const logger = new InMemoryLogger();

  const baseService = new UserApiService();

  const retryService = new RetryDecorator(baseService, logger);

  const loggingService = new LoggingDecorator(retryService, logger);

  const analyticsService = new AnalyticsDecorator(loggingService, logger);

  return {
    service: analyticsService,
    logger,
  };
};
