import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { APIException } from 'src/internal/exception.filter';
import { TikTokRepository } from './tiktok.repository';

@Injectable()
export class TikTokService {
  constructor(private tikTokRepo: TikTokRepository) {}

  async getAccessToken(query: {
    app_id: string;
    auth_code: string;
    secret: string;
  }): Promise<any> {
    try {
      const { app_id, auth_code, secret } = query;
      const config = {
        method: 'post',
        url: 'https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          secret,
          app_id,
          auth_code,
        },
      };

      const response = await axios.request(config);
      const responseData = response.data;
      if (!responseData) {
        throw new APIException(
          `Could not get access token`,
          HttpStatus.NOT_FOUND,
        );
      }
      return responseData;
    } catch (error) {
      console.log(error);
      throw new APIException(
        `Failed to get TikTok access token: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAdAccounts(query: {
    app_id: string;
    accessToken: string;
    secret: string;
  }): Promise<any> {
    try {
      const { app_id, secret, accessToken } = query;
      const url =
        'https://business-api.tiktok.com/open_api/v1.3/oauth2/advertiser/get/';
      const config = {
        method: 'get',
        url,
        headers: {
          'Access-Token': accessToken,
        },
        params: {
          secret,
          app_id,
        },
      };

      const response = await axios.request(config);
      const responseData = response.data;
      if (!responseData) {
        throw new APIException(
          `Could not get advertiser accounts`,
          HttpStatus.NOT_FOUND,
        );
      }
      return responseData;
    } catch (error) {
      console.log(error);
      throw new APIException(
        `Failed to get advertiser accounts: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllCampaigns(
    accessToken: string,
    advertiserId: string,
  ): Promise<any> {
    try {
      const url = 'https://business-api.tiktok.com/open_api/v1.3/campaign/get/';
      const config = {
        method: 'get',
        url: `${url}?advertiser_id=${advertiserId}`,
        headers: {
          'Access-Token': accessToken,
        },
      };

      const response = await axios.request(config);
      const responseData = response.data;
      if (!responseData) {
        throw new APIException(`Could not get campaigns`, HttpStatus.NOT_FOUND);
      }
      this.tikTokRepo.create({ accessToken });
      return responseData;
    } catch (error) {
      console.log(error);
      throw new APIException(
        `Failed to fetch all campaigns: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllAds(accessToken: string, advertiserId: string): Promise<any> {
    try {
      const url = 'https://business-api.tiktok.com/open_api/v1.3/ad/get/';
      const config = {
        method: 'get',
        url: `${url}?advertiser_id=${advertiserId}`,
        headers: {
          'Access-Token': accessToken,
        },
      };

      const response = await axios.request(config);
      const responseData = response.data;
      if (!responseData) {
        throw new APIException(`Could not get all ads`, HttpStatus.NOT_FOUND);
      }
      this.tikTokRepo.create({ accessToken });
      return responseData;
    } catch (error) {
      console.log(error);
      throw new APIException(
        `Failed to fetch all ads: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllAccessibleCustomersInfo(
    accessToken: string,
    managerCustomerId: string,
  ): Promise<any> {
    try {
      const data = JSON.stringify({
        query:
          'SELECT customer.descriptive_name, customer_client.client_customer, customer_client.id, customer_client.manager, customer_client.resource_name,customer_client.status, customer_client.descriptive_name, customer_client.test_account, customer_client.level, customer_client.currency_code FROM customer_client',
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://googleads.googleapis.com/v15/customers/${managerCustomerId}/googleAds:search`,
        headers: {
          'developer-token': '5-Rn_DmpPUX5UKJmnZ_8hA',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        data: data,
      };

      const response = await axios.request(config);
      const responseData = response.data;
      if (!responseData) {
        throw new APIException(
          `Could not get accessible customers information`,
          HttpStatus.NOT_FOUND,
        );
      }
      return responseData;
    } catch (error) {
      console.log(error);
      throw new APIException(
        `Failed to fetch Google accessible customers info: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
