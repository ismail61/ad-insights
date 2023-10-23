import { Injectable } from '@nestjs/common';
import { FacebookModel } from './model';

@Injectable()
export class FacebookRepository {
  async create(data: Record<string, any>) {
    return await FacebookModel.create(data);
  }
}
