import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PetDto {
  @ApiProperty({ required: true, example: 'luna' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: true, example: 'description' })
  @IsString()
  @IsOptional()
  type: string;

  @ApiProperty({ required: true, example: 'photo one' })
  @IsOptional()
  image: string;

  @ApiProperty({ required: true, example: 'photo two' })
  @IsOptional()
  logo: string;

  @ApiProperty({ required: true, example: 'true' })
  @IsBoolean()
  @IsOptional()
  status: boolean;
}
