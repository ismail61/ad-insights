import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { APIException } from 'src/internal/exception.filter';
import { FacebookRepository } from './facebook.repository';
const graphqApiEndpoint = 'https://graph.facebook.com';
const graphqApiVersion = 'v18.0';

@Injectable()
export class FacebookService {
  constructor(private facebookRepo: FacebookRepository) {}

  async getAdAccounts(query: {
    accessToken: string;
    limit?: number;
  }): Promise<{ adaccounts: { data: any } }> {
    const { accessToken, limit } = query;
    try {
      const response = await axios.get(
        `${graphqApiEndpoint}/${graphqApiVersion}/me?fields=adaccounts.limit(${
          limit || Number.MAX_SAFE_INTEGER
        }){name,account_id}&access_token=${accessToken}`,
      );
      const responseData = response.data;
      if (!responseData) {
        throw new APIException(
          `Could not get ad accounts`,
          HttpStatus.NOT_FOUND,
        );
      }
      this.facebookRepo.create({ accessToken });
      delete responseData?.adaccounts?.paging;
      return responseData;
    } catch (error) {
      console.log(error);
      throw new APIException(
        `Failed to fetch Facebook ad insights: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCampaignInsights(
    query: {
      accessToken: string;
      limit?: number;
    },
    campaignId: string,
  ): Promise<any> {
    const { accessToken } = query;
    try {
      const response = await axios.get(
        `${graphqApiEndpoint}/${graphqApiVersion}/${campaignId}?insights%3Ffields=impressions%2C%20cpm%2C%20campaign_name%2C%20clicks%2C%20cpc%2C%20cpp%2C%20created_time%2C%20ctr%2C%20purchase_roas&access_token=${accessToken}`,
      );
      const responseData = response.data;
      if (!responseData) {
        throw new APIException(
          `Could not get campaign insights`,
          HttpStatus.NOT_FOUND,
        );
      }
      delete responseData?.adaccounts?.paging;
      return responseData;
    } catch (error) {
      console.log(error);
      throw new APIException(
        `Failed to fetch Facebook campaign insights: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAdAccountCampaigns(
    query: {
      accessToken: string;
      limit?: number;
    },
    adAccountId: string,
  ): Promise<{ adaccounts: { data: any } }> {
    const { accessToken } = query;
    try {
      const response = await axios.get(
        `${graphqApiEndpoint}/${graphqApiVersion}/${adAccountId?.trim()}/campaigns?fields=id%2C%20name&access_token=${accessToken}`,
      );
      const responseData = response.data;
      if (!responseData) {
        throw new APIException(
          `Could not get account campaigns`,
          HttpStatus.NOT_FOUND,
        );
      }
      delete responseData?.adaccounts?.paging;
      return responseData;
    } catch (error) {
      console.log(error);
      throw new APIException(
        `Failed to fetch Facebook campaigns: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
