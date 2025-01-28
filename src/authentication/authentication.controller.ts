import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsAdminGuard } from 'src/users/guards/is-admin.guard';
import { AuthenticationService } from './authenticationservice';
import { LoginDto } from './dto/login-dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private AuthenticationService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Logged in user.',
  })
  @ApiBody({
    type: () => LoginDto,
  })
  async login(@Request() req) {
    return this.AuthenticationService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @Post('login-as/:id')
  @ApiResponse({
    status: 200,
    description: 'Logged in as another user. Can be used only by admins',
  })
  async loginAs(@Param('id') id: number,) {
    return this.AuthenticationService.loginAs(id);
  }
}
