import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { APIException } from 'src/internal/exception.filter';
import { FacebookRepository } from './facebook.repository';
const graphqlApiEndpoint = 'https://graph.facebook.com';
const graphqlApiVersion = 'v18.0';
const scope = ['email', 'ads_management', 'ads_read', 'read_insights'].join(
  ',',
);
const responseType = 'code';
const authType = 'rerequest';
const display = 'popup';

@Injectable()
export class FacebookService {
  constructor(private facebookRepo: FacebookRepository) {}

  async getAuthCode(client_id: string, redirect_uri: string): Promise<any> {
    try {
      const stringifiedParams = `client_id=${client_id}&redirect_uri=${encodeURIComponent(
        redirect_uri,
      )}&scope=${scope}&response_type=${responseType}&auth_type=${authType}&display=${display}`;

      const facebookLoginUrl = `https://www.facebook.com/v18.0/dialog/oauth?${stringifiedParams}`;
      return { redirectUrl: facebookLoginUrl };
    } catch (error) {
      console.log(error);
      throw new APIException(
        `Failed to get Facebook auth code: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAccessToken(query: {
    auth_code: string;
    client_id: string;
    redirect_uri: string;
    client_secret: string;
  }): Promise<any> {
    try {
      const { client_id, redirect_uri, client_secret, auth_code } = query;
      const response = await axios.get(
        `${graphqlApiEndpoint}/${graphqlApiVersion}/oauth/access_token?client_id=${client_id}&redirect_uri=${redirect_uri}&client_secret=${client_secret}&code=${auth_code}`,
      );
      const responseData = response.data;
      if (!responseData) {
        throw new Error();
      }
      return responseData;
    } catch (error) {
      console.log(error);
      throw new APIException(
        `Failed to get facebook access token: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAdAccounts(query: {
    accessToken: string;
    limit?: number;
  }): Promise<{ adaccounts: { data: any } }> {
    const { accessToken, limit } = query;
    try {
      const response = await axios.get(
        `${graphqlApiEndpoint}/${graphqlApiVersion}/me?fields=adaccounts.limit(${
          limit || Number.MAX_SAFE_INTEGER
        }){name,account_id}&access_token=${accessToken}`,
      );
      const responseData = response.data;
      if (!responseData) {
        throw new Error();
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
        `${graphqlApiEndpoint}/${graphqlApiVersion}/${campaignId}?insights%3Ffields=impressions%2C%20cpm%2C%20campaign_name%2C%20clicks%2C%20cpc%2C%20cpp%2C%20created_time%2C%20ctr%2C%20purchase_roas&access_token=${accessToken}`,
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
        `${graphqlApiEndpoint}/${graphqlApiVersion}/${adAccountId?.trim()}/campaigns?fields=id%2C%20name&access_token=${accessToken}`,
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
