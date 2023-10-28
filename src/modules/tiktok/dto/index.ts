import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { AccessTokenQueryDto } from 'src/dto/common.dto';

export class GetAdAccountsQueryDto {
  @ApiProperty({
    description:
      'The App ID applied by the developer. It can be found in the Basic Information section for you app under My Apps.',
  })
  @IsString()
  @IsNotEmpty()
  app_id: string;

  @ApiProperty({
    description: `The private key of the developer's App. It can be found in the Basic Information section for your app under My Apps.`,
  })
  @IsString()
  @IsNotEmpty()
  secret: string;
}

export class GetAllAdAccountsQueryDto extends GetAdAccountsQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}

export class GetTikTokAccessTokenQueryDto extends GetAdAccountsQueryDto {
  @ApiProperty({
    description:
      'Authorization code provided once the callback is complete. It is valid for 1 hour and can only be used once. For more details see TikTok Authorization.',
  })
  @IsString()
  @IsNotEmpty()
  auth_code: string;
}

export class GetAllCampaignsQueryDto extends AccessTokenQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  advertiserId: string;
}
