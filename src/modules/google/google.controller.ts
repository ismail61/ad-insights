import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AccessTokenQueryDto } from '../../dto/common.dto';
import { GoogleService } from './google.service';

@Controller('google-insights')
@ApiTags('Google Insights API')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('/accessible-customers')
  @ApiOperation({ summary: 'Obtain all accessible customers.' })
  async getAccessibleCustomers(@Query() query: AccessTokenQueryDto) {
    return await this.googleService.getAccessibleCustomers(query.accessToken);
  }

  @Get('/accessible-customers/:managerCustomerId/customers-info')
  @ApiOperation({
    summary:
      'Obtain all accessible customers info with the manager account information.',
  })
  @ApiParam({
    name: 'managerCustomerId',
    type: String,
    description:
      'Here managerCustomerId means the resourceNames[].customers/id property',
    example: `4812223147`,
    required: true,
  })
  async getAllAccessibleCustomersInfo(
    @Param('managerCustomerId') managerCustomerId: string,
    @Query() query: AccessTokenQueryDto,
  ) {
    return await this.googleService.getAllAccessibleCustomersInfo(
      query.accessToken,
      managerCustomerId,
    );
  }

  @Get(
    '/accessible-customers/:managerCustomerId/customers/:customerId/campaigns',
  )
  @ApiOperation({
    summary: 'Obtain all campaigns with metrics.',
  })
  @ApiParam({
    name: 'managerCustomerId',
    type: String,
    description:
      'Here managerCustomerId means the resourceNames[].[customers/id <-- this] property (also "clientCustomer": "customers/4539011362" && "manager": true <-- have a look)',
    example: `4812223147`,
    required: true,
  })
  @ApiParam({
    name: 'customerId',
    type: String,
    example: '4533811362',
    description:
      'Here customerId means the customerClient.clientCustomer[customers/id <-- this] property (also "clientCustomer": "customers/4539011362" && "manager": false)',
    required: true,
  })
  async getCampaignInsights(
    @Query() query: AccessTokenQueryDto,
    @Param('managerCustomerId') managerCustomerId: string,
    @Param('customerId') customerId: string,
  ) {
    return await this.googleService.getAllCampaigns(
      query.accessToken,
      managerCustomerId,
      customerId,
    );
  }
}
