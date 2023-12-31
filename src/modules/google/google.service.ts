import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { APIException } from 'src/internal/exception.filter';
import { GoogleRepository } from './google.repository';
import { googleConfig } from 'config/google';
const scope = 'https://www.googleapis.com/auth/adwords';
const responseType = 'code';
const prompt = 'consent';

@Injectable()
export class GoogleService {
  constructor(private googleRepo: GoogleRepository) {}

  async getAuthCodeRedirectUri(): Promise<any> {
    try {
      const stringifiedParams = `client_id=${
        googleConfig.clientID
      }&redirect_uri=${encodeURIComponent(
        googleConfig.redirectUri,
      )}&scope=${scope}&response_type=${responseType}&prompt=${prompt}&include_granted_scopes=${true}`;

      const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
      return { redirectUrl };
    } catch (error) {
      console.log(error);
      throw new APIException(
        `Failed to get Facebook auth code: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAccessToken(code: string): Promise<any> {
    try {
      const requestData = {
        code,
        client_id: googleConfig.clientID,
        client_secret: googleConfig.clientSecret,
        redirect_uri: googleConfig.redirectUri,
        grant_type: 'authorization_code',
      };
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      // Convert the requestData to a URL-encoded string
      const data = new URLSearchParams(requestData).toString();
      const response = await axios.post(
        'https://oauth2.googleapis.com/token',
        data,
        config,
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

  async getAccessibleCustomers(accessToken: string): Promise<any> {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://googleads.googleapis.com/v15/customers:listAccessibleCustomers',
        headers: {
          'developer-token': googleConfig.developerToken,
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.request(config);
      const responseData = response.data;
      if (!responseData) {
        throw new APIException(
          `Could not get accessible customers`,
          HttpStatus.NOT_FOUND,
        );
      }
      this.googleRepo.create({ accessToken });
      return responseData;
    } catch (error) {
      console.log(error);
      throw new APIException(
        `Failed to fetch Google accessible-customers: ${error.message}`,
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
          'developer-token': googleConfig.developerToken,
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

  async getAllCampaigns(
    accessToken: string,
    managerCustomerId: string,
    customerId: string,
  ): Promise<any> {
    try {
      const data = JSON.stringify({
        query:
          'SELECT campaign.name, campaign_budget.amount_micros, campaign.campaign_budget, campaign.id, campaign.status, campaign.optimization_score, campaign.advertising_channel_type, metrics.average_page_views, metrics.clicks, metrics.average_target_roas, metrics.impressions, metrics.ctr, metrics.average_cost, metrics.average_cpm, metrics.engagement_rate, metrics.engagements, metrics.average_cpe,metrics.conversions, metrics.cost_per_conversion, metrics.all_conversions, metrics.average_cpc, metrics.cost_micros, campaign.bidding_strategy_type FROM campaign',
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://googleads.googleapis.com/v15/customers/${customerId}/googleAds:search`,
        headers: {
          'developer-token': googleConfig.developerToken,
          'login-customer-id': managerCustomerId,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        data: data,
      };

      const response = await axios.request(config);
      const responseData = response.data;
      if (!responseData) {
        throw new APIException(
          `Could not get campaigns information`,
          HttpStatus.NOT_FOUND,
        );
      }
      return responseData;
    } catch (error) {
      console.log(error);
      throw new APIException(
        `Failed to fetch Google campaigns info: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
