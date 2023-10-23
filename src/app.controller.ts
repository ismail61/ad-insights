import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { FacebookService } from './modules/facebook/facebook.service';
import { GoogleService } from './modules/google/google.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AccessTokenQueryDto,
  AdAccountsRootSuccessSuccessResponseDto,
  CommonErrorResponseDto,
} from './dto/common.dto';
import {
  GetFacebookAdAccountsQueryDto,
  GetFacebookAdInsightsQueryDto,
} from './modules/facebook/dto/facebook.dto';

@Controller('ad-insights')
@ApiTags('Facebook Ad Insights API')
export class AppController {
  constructor(
    private readonly facebookService: FacebookService,
    private readonly googleService: GoogleService,
  ) {}

  @Get('/facebook/ad-accounts')
  @ApiOperation({ summary: 'Obtain all ad accounts.' })
  @ApiResponse({
    description: 'Obtain Ad Accounts Success Response Type',
    type: AdAccountsRootSuccessSuccessResponseDto,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Obtain Ad Accounts Error Response Type',
    type: CommonErrorResponseDto,
    status: HttpStatus.BAD_REQUEST,
  })
  async getAdAccounts(@Query() query: GetFacebookAdAccountsQueryDto) {
    return await this.facebookService.getAdAccounts(query);
  }

  @Get('/facebook/ad-accounts/:adAccountId/campaigns')
  @ApiOperation({ summary: 'Obtain campaigns for this ad account.' })
  @ApiParam({
    name: 'adAccountId',
    type: String,
    description: 'Here adAccountId means the adaccounts.id property',
    required: true,
  })
  @ApiResponse({
    description: 'Obtain Ad Account Campaigns Success Response Type',
    // type: AdAccountsRootSuccessSuccessResponseDto,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Obtain Ad Account Campaigns Error Response Type',
    type: CommonErrorResponseDto,
    status: HttpStatus.BAD_REQUEST,
  })
  async getAdAccountCampaigns(
    @Param('adAccountId') adAccountId: string,
    @Query() query: GetFacebookAdInsightsQueryDto,
  ) {
    return await this.facebookService.getAdAccountCampaigns(query, adAccountId);
  }

  @Get('/facebook/ad-accounts/campaigns/:campaignId/insights')
  @ApiOperation({
    summary: 'Obtain single campaign insights for this ad account.',
  })
  @ApiParam({
    name: 'campaignId',
    type: String,
    description: 'Here campaignId means the campaigns.id property',
    required: true,
  })
  @ApiResponse({
    description: 'Obtain Ad Account Campaign Insights Success Response Type',
    // type: AdAccountsRootSuccessSuccessResponseDto,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Obtain Ad Account Campaign Insights Error Response Type',
    type: CommonErrorResponseDto,
    status: HttpStatus.BAD_REQUEST,
  })
  async getCampaignInsights(
    @Query() query: AccessTokenQueryDto,
    @Param('campaignId') campaignId: string,
  ) {
    return await this.facebookService.getCampaignInsights(query, campaignId);
  }
}
