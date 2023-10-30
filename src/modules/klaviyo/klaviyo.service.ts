import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { APIException } from 'src/internal/exception.filter';
import { KlaviyoRepository } from './klaviyo.repository';

@Injectable()
export class KlaviyoService {
  constructor(private tikTokRepo: KlaviyoRepository) {}

  async getAdAccounts(privateApiKey: string): Promise<any> {
    try {
      const options = {
        method: 'GET',
        url: 'https://a.klaviyo.com/api/accounts/',
        headers: {
          accept: 'application/json',
          revision: '2023-10-15',
          Authorization: `Klaviyo-API-Key ${privateApiKey}`,
        },
      };

      const response = await axios.request(options);
      const responseData = response.data;
      if (!responseData) {
        throw new APIException(
          `Could not get ad accounts`,
          HttpStatus.NOT_FOUND,
        );
      }
      return responseData;
    } catch (error) {
      console.log(error);
      throw new APIException(
        `Failed to get ad accounts: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllCampaigns(privateApiKey: string, type: string): Promise<any> {
    try {
      const options = {
        method: 'GET',
        url: `https://a.klaviyo.com/api/campaigns/?filter=equals%28messages.channel%2C%27${type}%27%29`,
        headers: {
          accept: 'application/json',
          revision: '2023-10-15',
          Authorization: `Klaviyo-API-Key ${privateApiKey}`,
        },
      };

      const response = await axios.request(options);
      const responseData = response.data;
      if (!responseData) {
        throw new APIException(`Could not get campaigns`, HttpStatus.NOT_FOUND);
      }
      this.tikTokRepo.create({ accessToken: privateApiKey });
      return responseData;
    } catch (error) {
      console.log(error);
      throw new APIException(
        `Failed to fetch all campaigns: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllMetrics(privateApiKey: string): Promise<any> {
    try {
      const options = {
        method: 'GET',
        url: 'https://a.klaviyo.com/api/metrics/',
        headers: {
          accept: 'application/json',
          revision: '2023-10-15',
          Authorization: `Klaviyo-API-Key ${privateApiKey}`,
        },
      };

      const response = await axios.request(options);
      const responseData = response.data;
      if (!responseData) {
        throw new APIException(`Could not get metrics`, HttpStatus.NOT_FOUND);
      }
      return responseData;
    } catch (error) {
      console.log(error);
      throw new APIException(
        `Failed to fetch metrics: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
