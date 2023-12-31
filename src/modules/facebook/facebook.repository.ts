import { Injectable } from '@nestjs/common';
import { TokenModel } from './model';

@Injectable()
export class FacebookRepository {
  async create(data: Record<string, any>) {
    return await TokenModel.create({
      tokenType: 'facebook',
      ...data,
    });
  }
}
