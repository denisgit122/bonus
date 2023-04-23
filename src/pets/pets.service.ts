import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../core/orm/prisma.service';
import { PetDto } from './dto/pet.dto';
import { UsersService } from '../users/users.service';
import { Pets } from '@prisma/client';

@Injectable()
export class PetsService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  async getAllPets(): Promise<Pets[]> {
    return this.prismaService.pets.findMany({});
  }
  async findById(petId: string): Promise<Pets> {
    return this.prismaService.pets.findFirst({
      where: { id: +petId },
    });
  }

  async checkUser(userId: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return null;
    }
    return user;
  }

  async updateAnimal(data: PetDto, userId: string): Promise<Pets> {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return null;
    }
    return this.prismaService.pets.create({
      data: {
        name: data.name,
        type: data.type,
        status: data.status,
        image: data.image,
        logo: data.logo,
        ownerId: +userId,
      },
    });
  }

  async deletePet(petId: string) {
    return this.prismaService.pets.delete({
      where: { id: +petId },
    });
  }
}
