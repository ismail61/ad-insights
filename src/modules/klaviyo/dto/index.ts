import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class KlaviyoPrivateKeyQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  privateApiKey: string;
}
