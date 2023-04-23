import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserDto } from './dto/users.dto';
import { PrismaService } from '../core/orm/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(userdata: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name: userdata.name,
        city: userdata.city,
        status: userdata.status,
        age: userdata.age,
        email: userdata.email,
        avatar: userdata.avatar,
      },
    });
  }
  async getUsersList(): Promise<User[]> {
    return this.prismaService.user.findMany({
      // orderBy sort by name
      //   orderBy: {
      //     name: 'sa',
      //   },
      //   // take take 5 users
      //   take: 5,
    });
  }
  async getUserById(userId: string) {
    return this.prismaService.user.findFirst({
      where: { id: +userId },
      // select що будемо віддават при запросі
      select: {
        name: true,
        email: true,
        age: true,
        pets: true,
      },
      // include: {
      //   pets: true,
      // },
    });
  }

  async deleteUser(userId: string) {
    return this.prismaService.user.delete({
      where: { id: +userId },
    });
    // this.users.splice(userId, 1);
    // return this.users;
  }

  async findByEmail(userEmail: string) {
    return this.prismaService.user.findFirst({
      where: { email: userEmail },
    });
  }
}
