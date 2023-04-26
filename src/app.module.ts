import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { PrismaService } from './core/orm/prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './core/orm/prisma.module';
import {AuthController} from "./auth/auth.controller";

@Module({
  imports: [
    UsersModule,
    PetsModule,
    PrismaModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService, UsersService, PrismaModule],
})
export class AppModule {}
