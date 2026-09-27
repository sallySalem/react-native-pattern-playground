import { ApiService } from './ApiService';

export class UserApiService implements ApiService {
  async request(): Promise<string> {
    return 'User data';
  }
}
