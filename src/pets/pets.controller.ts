import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../core/file-upload/file.upload';
import { PetsService } from './pets.service';
import { UsersService } from '../users/users.service';
import { Pets } from '@prisma/client';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
  constructor(
    private readonly userService: UsersService,
    private readonly petsService: PetsService,
  ) {}
  @Get('/')
  async getAll(@Req() req: any, @Res() res: any, @Body() body: Pets[]) {
    return res.status(HttpStatus.OK).json(await this.petsService.getAllPets());
  }

  @ApiParam({ name: 'petId', required: true })
  @Get('/:petId')
  async getById(
    @Req() req: any,
    @Res() res: any,
    @Param('petId') petId: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.petsService.findById(petId));
  }

  @Patch('/:userId')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'logo', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './public/animals',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      },
    ),
  )
  async updatePet(
    @Param('userId') userId: string,
    @Req() req: any,
    @Body() body: any,
    @Res() res: any,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; logo?: Express.Multer.File[] },
  ) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: `User with id: ${userId} not fount` });
    }
    if (files?.image) {
      body.image = `/animals/${files.image[0].filename}`;
    }
    if (files?.logo) {
      body.logo = `/animals/${files.logo[0].filename}`;
    }
    return res
      .status(HttpStatus.OK)
      .json(await this.petsService.updateAnimal(body, userId));
  }

  @ApiParam({ name: 'petId', required: true })
  @Delete('/:petId')
  async deletePet(
    @Req() req: any,
    @Res() res: any,
    @Param('petId') petId: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.petsService.deletePet(petId));
  }
}
