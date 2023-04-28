import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByUsername(username: string): Promise<UserDocument | null> {
    try {
      const user = (await this.userModel.findOne({ username }).exec()) as UserDocument;
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find().exec();
      return users;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving users', error);
    }
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return await createdUser.save().catch((error) => {
      throw new Error(`${error.message}`);
    });
  }

  async update(id: string, user: User): Promise<User> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return deletedUser;
  }
}
