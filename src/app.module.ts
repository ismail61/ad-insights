import { Module } from '@nestjs/common';
import { FacebookModule } from './modules/facebook/facebook.module';
import { GoogleModule } from './modules/google/google.module';
import { TikTokModule } from './modules/tiktok/tiktok.module';

@Module({
  imports: [FacebookModule, GoogleModule, TikTokModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
