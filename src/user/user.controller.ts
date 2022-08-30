import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  UnauthorizedException,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { SignUp, UserInterfaces } from '../interfaces/user.interfaces';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('/api/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Post('/signup')
  async signup(@Body() data: UserInterfaces) {
    const user = await this.userService.newUser(data);
    return user;
  }

  @Post('/signin')
  async signIn(@Body() data: SignUp) {
    const user = await this.authService.validateUser(data.email, data.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.signin(user);
  }

  @Post('/jwt/signin')
  @UseGuards(JwtAuthGuard)
  async signin(@Request() req) {
    return this.authService.signin(req.user);
  }
}
