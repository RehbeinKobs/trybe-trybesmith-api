import { Pool } from 'mysql2/promise';
import { IOrder } from '../interfaces';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IOrder[]> {
    const result = await this.connection.execute(
      `select ord.id, userId, json_arrayagg(pro.id) as productsIds
       from Trybesmith.Orders as ord
       join Trybesmith.Products as pro
       on ord.id = pro.orderId
       group by ord.id;`,
    );
    const [rows] = result;
    return rows as IOrder[];
  }
}
