import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AuthModule } from '../../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    AuthModule,
    JwtModule.register({ secret: process.env.JWT_SECRET_KEY }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  providers: [ProductService, JwtService],
  controllers: [ProductController],
})
export class ProductModule {}
