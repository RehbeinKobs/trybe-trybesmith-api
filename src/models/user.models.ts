import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IUser } from '../interfaces';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getById(id: number): Promise<IUser> {
    const result = await this.connection.execute(
      'SELECT * FROM Trybesmith.Users WHERE id = ?',
      [id],
    );
    const [rows] = result;
    const users = rows as IUser[];
    return users[0];
  }

  public async login(user: IUser): Promise<number> {
    const { username, password } = user;
    const result = await this.connection.execute(
      'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
      [username, password],
    );
    const [rows] = result;
    const users = rows as IUser[];
    if (users.length > 0) return users[0].id as number;
    return NaN;
  }

  public async create(user: IUser): Promise<number> {
    const { username, classe, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    const { insertId } = result[0];
    return insertId;
  }
}
