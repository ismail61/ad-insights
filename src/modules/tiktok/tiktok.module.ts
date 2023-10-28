import { Module } from '@nestjs/common';
import { TikTokController } from './tiktok.controller';
import { TikTokRepository } from './tiktok.repository';
import { TikTokService } from './tiktok.service';

@Module({
  controllers: [TikTokController],
  providers: [TikTokService, TikTokRepository],
})
export class TikTokModule {}
