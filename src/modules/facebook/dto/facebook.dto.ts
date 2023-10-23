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
