import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { KlaviyoService } from './klaviyo.service';
import { KlaviyoPrivateKeyQueryDto } from './dto';

@Controller('klaviyo-insights')
@ApiTags('Klaviyo Insights API')
export class KlaviyoController {
  constructor(private readonly tikTokService: KlaviyoService) {}

  // @Get('/access-token')
  // @ApiOperation({
  //   summary:
  //     'Obtain an access token and list of accounts that the token can access.',
  // })
  // async getAccessToken(@Query() query: GetTikTokAccessTokenQueryDto) {
  //   return await this.tikTokService.getAccessToken(query);
  // }

  @Get('/ad-accounts')
  @ApiOperation({
    summary: 'Obtain all authorized ad accounts',
  })
  async getAdAccounts(@Query() query: KlaviyoPrivateKeyQueryDto) {
    return await this.tikTokService.getAdAccounts(query.privateApiKey);
  }

  @Get('/email-campaigns')
  @ApiOperation({ summary: 'Obtain all email campaigns' })
  async getAllEmailCampaigns(@Query() query: KlaviyoPrivateKeyQueryDto) {
    return await this.tikTokService.getAllCampaigns(
      query.privateApiKey,
      'email',
    );
  }

  @Get('/sms-campaigns')
  @ApiOperation({ summary: 'Obtain all sms campaigns' })
  async getAllSmsCampaigns(@Query() query: KlaviyoPrivateKeyQueryDto) {
    return await this.tikTokService.getAllCampaigns(query.privateApiKey, 'sms');
  }

  @Get('/metrics')
  @ApiOperation({ summary: 'Obtain metrics' })
  async getAllMetrics(@Query() query: KlaviyoPrivateKeyQueryDto) {
    return await this.tikTokService.getAllMetrics(query.privateApiKey);
  }
}
