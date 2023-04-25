import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/role.guard';
import { Role } from '../../common/enums/roles.enums';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UseGuards(AuthGuard())
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productService.findById(id);
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async create(@Body() product: Product): Promise<Product> {
    return await this.productService.create(product);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return await this.productService.update(id, product);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async delete(@Param('id') id: string): Promise<Product> {
    return await this.productService.delete(id);
  }
}
