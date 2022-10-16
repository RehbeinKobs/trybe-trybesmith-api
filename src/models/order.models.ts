import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IOrder } from '../interfaces';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getById(id: number): Promise<IOrder[]> {
    const result = await this.connection.execute(
      `select ord.id, userId, json_arrayagg(pro.id) as productsIds
       from Trybesmith.Orders as ord
       join Trybesmith.Products as pro
       on ord.id = pro.orderId
       where userId = ?
       group by ord.id;`,
      [id],
    );
    const [rows] = result;
    return rows as IOrder[];
  }

  public async create(order: IOrder): Promise<IOrder> {
    const { userId, productsIds } = order;
    productsIds.forEach(async (prodId) => {
      const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
        'insert into Trybesmith.Orders (userId) values (?);',
        [userId],
      );
      await this.connection.execute(
        'update Trybesmith.Products set orderId = ? where id = ?',
        [insertId, prodId],
      );
    });
    return order;
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
