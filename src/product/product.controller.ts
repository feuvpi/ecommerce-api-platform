import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guard/auth.guard';
import { JwtService } from '../auth/jwt/jwt.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService, private readonly jwtService: JwtService) {}

  @Get()
  @UseGuards(AuthGuard())
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productService.findById(id);
  }

  @Post()
  @UseGuards(new JwtAuthGuard(this.jwtService, true))
  async create(@Body() product: Product): Promise<Product> {
    return await this.productService.create(product);
  }

  @Put(':id')
  @UseGuards(new JwtAuthGuard(this.jwtService, true))
  async update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    console.log(this.jwtService);
    return await this.productService.update(id, product);
  }

  @Delete(':id')
  @UseGuards(new JwtAuthGuard(this?.jwtService, true))
  async delete(@Param('id') id: string): Promise<Product> {
    return await this.productService.delete(id);
  }
}
