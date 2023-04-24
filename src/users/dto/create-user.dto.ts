import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  isAdmin: boolean;

  _id: Types.ObjectId = new Types.ObjectId();
}
