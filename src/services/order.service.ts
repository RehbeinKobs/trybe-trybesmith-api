import connection from '../models/connection';
import OrderModel from '../models/order.models';
import { IOrder } from '../interfaces';
import throwError from '../utils/throwError';

export default class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<IOrder[]> {
    const orders = await this.model.getAll();
    return orders;
  }

  public async create(order: IOrder): Promise<IOrder> {
    const { productsIds } = order;

    if (!productsIds) throw throwError(400, '"productsIds" is required');
    if (!Array.isArray(productsIds)) throw throwError(422, '"productsIds" must be an array');
    if (productsIds.length <= 0) throw throwError(422, '"productsIds" must include only numbers');

    const result = await this.model.create(order);
    return result;
  }
}
