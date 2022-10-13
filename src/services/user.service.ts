import connection from '../models/connection';
import UserModel from '../models/user.models';
import { IUser } from '../interfaces';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: IUser): Promise<number> {
    const result = await this.model.create(user);
    return result;
  }
}
