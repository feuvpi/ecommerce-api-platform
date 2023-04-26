import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  isAdmin: boolean;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toJSON() {}
}
