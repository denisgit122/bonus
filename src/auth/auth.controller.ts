import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

// @ApiTags('Auth')
// @Controller('auth')
// export class AuthController {
//   @UseGuards(AuthGuard('local'))
//   @Post('login')
//   async login(@Req() req: any) {
//     return req.user;
//   }
// }
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  // @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Req() req: any, @Res() res: any) {
    return req.user;
  }
}
