import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(productDto: any): Promise<Product> {
    try {
      const createdProduct = new this.productModel(productDto);
      return await createdProduct.save();
    } catch (error) {
      throw new Error(`Could not create product: ${error.message}`);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productModel.find().exec();
    } catch (error) {
      throw new Error(`Could not find products: ${error.message}`);
    }
  }

  async findById(id: string): Promise<Product> {
    try {
      return await this.productModel.findById(id).exec();
    } catch (error) {
      throw new Error(`Could not find product with ID ${id}: ${error.message}`);
    }
  }

  async update(id: string, productDto: any): Promise<Product> {
    try {
      return await this.productModel.findByIdAndUpdate(id, productDto, { new: true }).exec();
    } catch (error) {
      throw new Error(`Could not update product with ID ${id}: ${error.message}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
      if (deletedProduct) {
        return deletedProduct;
      } else {
        throw new Error(`Não foi possível excluir o produto com o ID ${id}`);
      }
    } catch (error) {
      throw new Error(`Não foi possível excluir o produto com o ID ${id}: ${error.message}`);
    }
  }

  async findLast(): Promise<Product> {
    try {
      return await this.productModel.findOne().sort({ $natural: -1 }).limit(1).exec();
    } catch (error) {
      throw new Error(`Could not find last product: ${error.message}`);
    }
  }
}
