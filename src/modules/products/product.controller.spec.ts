/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import mongoose from 'mongoose';
import { ProductModule } from './product.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { ProductSchema } from './product.schema';
dotenv.config();

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
      imports: [ProductModule, MongooseModule.forRoot(process.env.MONGODB_URI), MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
    }).compile();

    controller = moduleRef.get<ProductController>(ProductController);
    service = moduleRef.get<ProductService>(ProductService);
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const id = new mongoose.Types.ObjectId();
      const id2 = new mongoose.Types.ObjectId();
      const result: Product[] = [
        {
          _id: id,
          name: 'product 1',
          price: 10,
          stock: 5,
        },
        {
          _id: id2,
          name: 'product 2',
          price: 20,
          stock: 10,
        },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(result));

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a product', async () => {
      const id = new mongoose.Types.ObjectId();
      const result: Product = {
        _id: id,
        name: 'product 1',
        price: 10,
        stock: 5,
      };
      const productDto = {
        _id: id,
        name: 'product 1',
        price: 10,
        stock: 5,
      };
      jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(result));

      expect(await controller.create(productDto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const id = new mongoose.Types.ObjectId();
      const originalProduct: Product = {
        _id: id,
        name: 'product 1',
        price: 10,
        stock: 5,
      };
      const updatedProduct: Product = {
        _id: id,
        name: 'product 1 updated',
        price: 20,
        stock: 60,
      };
      jest.spyOn(service, 'update').mockImplementation(() => Promise.resolve(updatedProduct));
  
      expect(await controller.update(id.toString(), updatedProduct)).toEqual(updatedProduct);
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      const id = new mongoose.Types.ObjectId();
      const result: Product = {
        _id: id,
        name: 'product 1',
        price: 10,
        stock: 5,
      };
      jest.spyOn(service, 'delete').mockImplementation(() => Promise.resolve(result));

      expect(await controller.delete(id.toString())).toBe(result);
    });
  });
});
