import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { RolesGuard } from '../../auth/guards/guards/role.guard';
import { Role } from '../../auth/guards/enums/roles.enums';
import { Roles } from '../../auth/guards/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productService.findById(id);
  }

  @Get('last')
  async findLast(): Promise<Product> {
    return await this.productService.findLast();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  async create(@Body() product: Product): Promise<Product> {
    return await this.productService.create(product);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return await this.productService.update(id, product);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  async delete(@Param('id') id: string): Promise<Product> {
    return await this.productService.delete(id);
  }
}
