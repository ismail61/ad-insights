import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { AccessTokenQueryDto } from 'src/dto/common.dto';

export class GetFacebookAdInsightsQueryDto extends AccessTokenQueryDto {
  @ApiProperty({ required: false, type: Number })
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}

export class GetFacebookAdAccountsQueryDto extends AccessTokenQueryDto {
  @ApiProperty({ required: false, type: Number })
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}

export class GetFacebookAuthCodeQueryDto {
  @ApiProperty({
    description: `The ID of your app, found in your app's dashboard.. see more at https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow/`,
  })
  @IsString()
  @IsNotEmpty()
  client_id: string;

  @ApiProperty({
    description: `The URL that you want to redirect the person logging in back to. This URL will capture the response from the Login Dialog. If you are using this in a webview within a desktop app, this must be set to https://www.facebook.com/connect/login_success.html. You can confirm that this URL is set for your app in the App Dashboard. Under Products in the App Dashboard's left side navigation menu, click Facebook Login, then click Settings. Verify the Valid OAuth redirect URIs in the Client OAuth Settings section`,
  })
  @IsString()
  @IsNotEmpty()
  redirect_uri: string;
}

export class GetFacebookAccessTokenQueryDto extends GetFacebookAuthCodeQueryDto {
  @ApiProperty({
    description: 'The parameter received from the Login Dialog redirect above.',
  })
  @IsString()
  @IsNotEmpty()
  auth_code: string;

  @ApiProperty({
    description:
      'Your unique app secret, shown on the App Dashboard. Never include this app secret in client-side code or in binaries that could be decompiled. It is extremely important that it remains completely secret as it is the core of the security of your app and all the people using it.',
  })
  @IsString()
  @IsNotEmpty()
  client_secret: string;
}
