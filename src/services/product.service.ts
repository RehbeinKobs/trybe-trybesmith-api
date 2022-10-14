import connection from '../models/connection';
import ProductModel from '../models/product.models';
import { IProduct } from '../interfaces';
import { validateFieldString } from './validations/validateField';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll(): Promise<IProduct[]> {
    const products = await this.model.getAll();
    return products;
  }

  public async create(product: IProduct): Promise<IProduct> {
    const { name, amount } = product;

    validateFieldString(name, 'name', 3);
    validateFieldString(amount, 'amount', 3);

    const result = await this.model.create(product);
    return result;
  }
}