import { Module } from '@nestjs/common';
import { FacebookModule } from './modules/facebook/facebook.module';
import { GoogleModule } from './modules/google/google.module';
import { TikTokModule } from './modules/tiktok/tiktok.module';
import { KlaviyoModule } from './modules/klaviyo/klaviyo.module';

@Module({
  imports: [FacebookModule, GoogleModule, TikTokModule, KlaviyoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
