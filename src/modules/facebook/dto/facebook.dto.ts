import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AccessTokenQueryDto } from 'src/dto/common.dto';

export class GetFacebookAdInsightsQueryDto extends AccessTokenQueryDto {}
export class GetFacebookAdAccountsQueryDto extends AccessTokenQueryDto {}

export class GetFacebookAccessTokenQueryDto {
  @ApiProperty({
    description: 'The parameter received from the Login Dialog redirect above.',
  })
  @IsString()
  @IsNotEmpty()
  auth_code: string;
}
