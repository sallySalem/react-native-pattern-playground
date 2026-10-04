import { ApiService } from './ApiService.ts';

export class UserApiService implements ApiService {
  async request(): Promise<string> {
    return 'User data';
  }
}
