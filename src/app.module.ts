/* eslint-disable prettier/prettier */
import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './modules/products/product.module';
import { UserModule } from './modules/users/user.module';
import { PassportModule } from '@nestjs/passport';
import { APP_INTERCEPTOR } from '@nestjs/core';

//import redisStore from 'cache-manager-redis-store';
import { redisStore } from 'cache-manager-redis-yet';
dotenv.config();

@Module({
  imports: [
    CacheModule.register({ 
      store: redisStore, 
      host: 'localhost', //default host
      port: 6379, //default port
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    ConfigModule.forRoot(),
    ProductModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
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
