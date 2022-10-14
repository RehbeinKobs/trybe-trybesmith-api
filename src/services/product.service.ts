import connection from '../models/connection';
import ProductModel from '../models/product.models';
import { IProduct } from '../interfaces';
import throwError from '../utils/throwError';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  private validateField = (field: string, name: string) => {
    if (!field) throw throwError(400, `"${name}" is required`);
    if (typeof field !== 'string') throw throwError(422, `"${name}" must be a string`);
    if (field.length < 3) {
      throw throwError(422, `"${name}" length must be at least 3 characters long`);
    }
  };

  public async getAll(): Promise<IProduct[]> {
    const products = await this.model.getAll();
    return products;
  }

  public async create(product: IProduct): Promise<IProduct> {
    const { name, amount } = product;

    this.validateField(name, 'name');
    this.validateField(amount, 'amount');

    const result = await this.model.create(product);
    return result;
  }
}