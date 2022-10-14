import connection from '../models/connection';
import UserModel from '../models/user.models';
import { IUser } from '../interfaces';
import throwError from '../utils/throwError';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: IUser): Promise<number> {
    const result = await this.model.create(user);
    return result;
  }

  public async login(user: IUser): Promise<number> {
    const { username, password } = user;
    if (!username) throw throwError(400, '"username" is required');
    if (!password) throw throwError(400, '"password" is required');
    const result = await this.model.login(user);
    if (result) return result;
    throw throwError(401, 'Username or password invalid');
  }
}
