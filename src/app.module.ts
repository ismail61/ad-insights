import { Module } from '@nestjs/common';
import { FacebookModule } from './modules/facebook/facebook.module';
import { GoogleModule } from './modules/google/google.module';

@Module({
  imports: [FacebookModule, GoogleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
