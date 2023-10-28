import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TikTokService } from './tiktok.service';
import {
  GetAllAdAccountsQueryDto,
  GetAllCampaignsQueryDto,
  GetTikTokAccessTokenQueryDto,
} from './dto';

@Controller('tiktok-insights')
@ApiTags('TikTok Insights API')
export class TikTokController {
  constructor(private readonly tikTokService: TikTokService) {}

  @Get('/access-token')
  @ApiOperation({
    summary:
      'Obtain an access token and list of accounts that the token can access.',
  })
  async getAccessToken(@Query() query: GetTikTokAccessTokenQueryDto) {
    return await this.tikTokService.getAccessToken(query);
  }

  @Get('/advertiser-accounts')
  @ApiOperation({
    summary: 'Obtain all authorized advertiser accounts',
  })
  async getAdAccounts(@Query() query: GetAllAdAccountsQueryDto) {
    return await this.tikTokService.getAdAccounts(query);
  }

  @Get('/campaigns')
  @ApiOperation({ summary: 'Obtain all campaigns' })
  async getAllCampaigns(@Query() query: GetAllCampaignsQueryDto) {
    return await this.tikTokService.getAllCampaigns(
      query.accessToken,
      query.advertiserId,
    );
  }

  @Get('/ads')
  @ApiOperation({ summary: 'Obtain all ads' })
  async getAllAds(@Query() query: GetAllCampaignsQueryDto) {
    return await this.tikTokService.getAllAds(
      query.accessToken,
      query.advertiserId,
    );
  }
}
