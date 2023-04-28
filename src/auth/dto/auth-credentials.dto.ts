import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { Role } from '../guards/enums/roles.enums';

export class AuthCredentialsDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  _id: Types.ObjectId;

  isAdmin: boolean;

  roles: Role[];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toJSON() {}
}
