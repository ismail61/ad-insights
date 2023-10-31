import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class GetGoogleAccessTokenQueryDto {
  @ApiProperty({
    description: `The client ID for your application. You can find this value in the API Console Credentials page. See more: https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow`,
  })
  @IsString()
  @IsNotEmpty()
  client_id: string;

  @ApiProperty({
    description: `Determines where the API server redirects the user after the user completes the authorization flow. The value must exactly match one of the authorized redirect URIs for the OAuth 2.0 client, which you configured in your client's API Console Credentials page. If this value doesn't match an authorized redirect URI for the provided client_id you will get a redirect_uri_mismatch error. Note that the http or https scheme, case, and trailing slash ('/') must all match.`,
  })
  @IsString()
  @IsNotEmpty()
  redirect_uri: string;
}

export class GoogleAccessTokenQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({
    description:
      'A developer token from Google lets your app connect to the Google Ads API. This is a 22-character long alphanumeric string, and is listed under the API Center page of your Google Ads manager account. .See more: https://developers.google.com/google-ads/api/docs/get-started/dev-token',
  })
  @IsString()
  @IsNotEmpty()
  developer_token: string;
}
