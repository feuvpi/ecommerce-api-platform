import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), AuthModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly configService: ConfigService) {} // inject ConfigService into AppModule

  async onModuleInit() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Conectado ao MongoDB');
    } catch (error) {
      console.log('Erro ao conectar ao MongoDB', error);
    }
  }
}
