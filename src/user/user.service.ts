import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterfaces } from '../interfaces/user.interfaces';
import { User, UserDocument } from './mongoose/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
  ) {}

  async newUser(data: UserInterfaces): Promise<UserInterfaces> {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = new this.UserModel({ ...data, password: passwordHash });
    return user.save();
  }

  async inputUser(email: string): Promise<UserInterfaces> {
    const result = await this.UserModel.findOne({ email: email }).exec();
    if (!result) {
      throw new NotFoundException('User not found');
    }

    return result;
  }
}
