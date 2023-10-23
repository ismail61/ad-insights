import { Module } from '@nestjs/common';
import { FacebookModule } from './modules/facebook/facebook.module';
import { GoogleModule } from './modules/google/google.module';
import { AppController } from './app.controller';

@Module({
  imports: [FacebookModule, GoogleModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
