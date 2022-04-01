import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { LocalAuthGuard } from 'src/common/guards';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  @Public()
  login(@Request() request: any) {
    return this.authService.login(request.user.dataValues);
  }
}
