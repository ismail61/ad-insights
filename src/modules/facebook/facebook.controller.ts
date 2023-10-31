import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AccessTokenQueryDto,
  AdAccountsRootSuccessSuccessResponseDto,
  CommonErrorResponseDto,
} from '../../dto/common.dto';
import {
  GetFacebookAccessTokenQueryDto,
  GetFacebookAdAccountsQueryDto,
  GetFacebookAdInsightsQueryDto,
  GetFacebookAuthCodeQueryDto,
} from './dto/facebook.dto';

@Controller('facebook-insights')
@ApiTags('Facebook Insights API')
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}

  @Get('/auth-code')
  @ApiOperation({
    summary: 'Obtain an auth code.',
  })
  async getAuthCode(@Query() query: GetFacebookAuthCodeQueryDto) {
    return await this.facebookService.getAuthCode(
      query.client_id,
      query.redirect_uri,
    );
  }

  @Get('/access-token')
  @ApiOperation({
    summary: 'Obtain a facebook access token',
  })
  async getAccessToken(@Query() query: GetFacebookAccessTokenQueryDto) {
    return await this.facebookService.getAccessToken(query);
  }

  @Get('/ad-accounts')
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

  @Get('/ad-accounts/:adAccountId/campaigns')
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

  @Get('/ad-accounts/campaigns/:campaignId/insights')
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
