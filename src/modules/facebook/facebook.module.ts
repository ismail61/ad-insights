import { Module } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { FacebookRepository } from './facebook.repository';

@Module({
  providers: [FacebookService, FacebookRepository],
  exports: [FacebookService],
})
export class FacebookModule {}
