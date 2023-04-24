import { Module } from '@nestjs/common';
import { JwtService } from './jwt/jwt.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
