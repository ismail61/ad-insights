import { Module } from '@nestjs/common';
import { KlaviyoController } from './klaviyo.controller';
import { KlaviyoRepository } from './klaviyo.repository';
import { KlaviyoService } from './klaviyo.service';

@Module({
  controllers: [KlaviyoController],
  providers: [KlaviyoService, KlaviyoRepository],
})
export class KlaviyoModule {}
