import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.inputUser(email);
    const matchPassword = await bcrypt.compare(password, user.password);

    if (user && matchPassword) {
      const result = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      return result;
    }

    return null;
  }

  async validateJwtUser(email: string, id: string) {
    const user = await this.userService.inputUser(email);
    if (user && user.id === id) {
      const result = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      return result;
    }
    return null;
  }

  signin(user) {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
    };

    return this.jwtService.sign(payload);
  }
}
