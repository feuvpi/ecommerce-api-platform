import { Test } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import mongoose from 'mongoose';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    controller = moduleRef.get<ProductController>(ProductController);
    service = moduleRef.get<ProductService>(ProductService);
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const id = '123';
      const objectId = new mongoose.Types.ObjectId(id);
      const id2 = '456';
      const objectId2 = new mongoose.Types.ObjectId(id);
      const result: Product[] = [
        {
          _id: objectId,
          name: 'product 1',
          price: 10,
          stock: 5,
        },
        {
          _id: objectId,
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
      const id = '123';
      const objectId = new mongoose.Types.ObjectId(id);
      const result: Product = {
        _id: objectId,
        name: 'product 1',
        price: 10,
        stock: 5,
      };
      const productDto = {
        _id: objectId,
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
      const id = '123';
      const objectId = new mongoose.Types.ObjectId(id);
      const result: Product = {
        _id: objectId,
        name: 'product 1',
        price: 10,
        stock: 5,
      };
      const productDto: Product = {
        name: 'product 1 updated',
        price: 20,
        stock: 60,
        _id: objectId,
      };
      jest.spyOn(service, 'update').mockImplementation(() => Promise.resolve(result));

      expect(await controller.update(objectId.toString(), productDto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      const id = '123';
      const objectId = new mongoose.Types.ObjectId(id);
      const result: Product = {
        _id: objectId,
        name: 'product 1',
        price: 10,
        stock: 5,
      };
      jest.spyOn(service, 'delete').mockImplementation(() => Promise.resolve(result));

      expect(await controller.delete('1')).toBe(result);
    });
  });
});
