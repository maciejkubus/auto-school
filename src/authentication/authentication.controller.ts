import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { IsAdminGuard } from 'src/users/guards/is-admin.guard';
import { AuthenticationService } from './authenticationservice';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private AuthenticationService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.AuthenticationService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @Post('login-as/:id')
  async loginAs(@Param('id') id: number,) {
    return this.AuthenticationService.loginAs(id);
  }
}
