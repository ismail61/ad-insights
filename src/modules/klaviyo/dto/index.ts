import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class KlaviyoPrivateKeyQueryDto {
  @ApiProperty({
    description: `Klaviyo uses public and private API keys to authenticate API requests. You can obtain and make changes to your API keys from your account's Settings page under the API Keys tab. To manage API keys, you must have an Owner, Admin, or Manager role on the account. See more: https://docs.getelevar.com/docs/how-to-create-klaviyo-private-api-key`,
  })
  @IsString()
  @IsNotEmpty()
  privateApiKey: string;
}
