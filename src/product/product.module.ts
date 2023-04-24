import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from 'src/auth/jwt/jwt.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), AuthModule, JwtModule.register({ secret: process.env.JWT_SECRET_KEY })],
  providers: [ProductService, JwtService],
  controllers: [ProductController],
})
export class ProductModule {}
