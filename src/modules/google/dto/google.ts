import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class GoogleAccessTokenQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}

export class GetGoogleAccessTokenQueryDto {
  @ApiProperty({
    description: 'The parameter received from the Login Dialog redirect above.',
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}
