import { NextFunction, Request, Response } from 'express';
import { IStatusError } from '../interfaces';
import OrderService from '../services/order.service';

export default class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await this.orderService.getAll();
      res.status(200).json(orders);
    } catch (e) {
      next(e as IStatusError);
    }
  };

  public create = async (userId: number, req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const order = await this.orderService.create({ userId, ...body });
      res.status(201).json(order);
    } catch (e) {
      next(e as IStatusError);
    }
  };
}
