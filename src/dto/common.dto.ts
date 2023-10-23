import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AccessTokenQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}

export class AdAccountsSuccessResponseTypeDto {
  @ApiProperty()
  account_id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  id: string;
}

export class AdAccountsSuccessSuccessResponseDto {
  @ApiProperty({ type: () => [AdAccountsSuccessResponseTypeDto] })
  data: AdAccountsSuccessResponseTypeDto[];
}

export class AdAccountsRootSuccessSuccessResponseDto {
  @ApiProperty({ type: () => AdAccountsSuccessSuccessResponseDto })
  adaccounts: AdAccountsSuccessSuccessResponseDto;

  @ApiProperty()
  id: string;
}

export class CommonErrorResponseTypeDto {
  @ApiProperty({ type: Number })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: [String] })
  errors: string[];
}

export class CommonErrorResponseDto {
  @ApiProperty({ type: CommonErrorResponseTypeDto })
  errorObj: CommonErrorResponseTypeDto;
}
