import { Injectable } from '@nestjs/common';
import { TokenModel } from '../facebook/model';

@Injectable()
export class KlaviyoRepository {
  async create(data: Record<string, any>) {
    return await TokenModel.create({
      tokenType: 'klaviyo',
      ...data,
    });
  }
}
