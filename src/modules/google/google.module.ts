import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleRepository } from './google.repository';
import { GoogleController } from './google.controller';

@Module({
  controllers: [GoogleController],
  providers: [GoogleService, GoogleRepository],
})
export class GoogleModule {}
