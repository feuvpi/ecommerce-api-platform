import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), ProductModule, AuthModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor() {}

  async onModuleInit() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Conectado ao MongoDB');
    } catch (error) {
      console.log('Erro ao conectar ao MongoDB', error);
    }
  }
}
