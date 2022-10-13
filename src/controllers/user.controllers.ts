import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser, IStatusError } from '../interfaces';
import UserService from '../services/user.service';

require('dotenv/config');

const secret = process.env.JWT_SECRET as string;

export default class ProductController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const data = await this.userService.create(body as IUser);
      const token = jwt.sign({ data }, secret, { expiresIn: '7d', algorithm: 'HS256' });
      res.status(201).json({ token });
    } catch (e) {
      next(e as IStatusError);
    }
  };
}
