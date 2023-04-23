import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  // @ApiProperty() name буде нвм показуватися в swagger
  // всі теги що починаються з Api для свагера
  //required: true поле обовязкове
  @ApiProperty({ required: true, example: 'Den' })
  @IsString()
  name: string;

  @ApiProperty({ required: false, example: 12 })
  @IsNumber()
  //не обовязково
  @IsOptional()
  age: number;

  @ApiProperty({ required: true, example: 'userEmail@mail.com' })
  @IsString()
  @IsEmail()
  // @IsNotEmpty() повинен бути email обовязково
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, example: 'Madrid' })
  @IsString()
  city: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty({ required: true, example: 'true' })
  @IsBoolean()
  @IsOptional()
  status: boolean;
}
