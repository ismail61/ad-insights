import { Module } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { FacebookRepository } from './facebook.repository';
import { FacebookController } from './facebook.controller';

@Module({
  controllers: [FacebookController],
  providers: [FacebookService, FacebookRepository],
})
export class FacebookModule {}
