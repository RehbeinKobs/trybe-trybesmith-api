import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IProduct } from '../interfaces';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IProduct[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Products');
    const [rows] = result;
    return rows as IProduct[];
  }

  public async create(product: IProduct): Promise<IProduct> {
    const { name, amount } = product;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const { insertId: id } = result[0];
    return { id, name, amount };
  }

  // public async create(book: Book): Promise<Book> {
  //   const { title, price, author, isbn } = book;
  //   const result = await this.connection.execute<ResultSetHeader>(
  //     'INSERT INTO books (title, price, author, isbn) VALUES (?, ?, ?, ?)',
  //     [title, price, author, isbn],
  //   );
  //   const [dataInserted] = result;
  //   const { insertId } = dataInserted;
  //   return { id: insertId, ...book };
  // }
}