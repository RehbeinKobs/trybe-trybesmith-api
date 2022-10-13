import { NextFunction, Request, Response } from 'express';
import { IProduct, IStatusError } from '../interfaces';
import ProductService from '../services/product.service';

export default class ProductController {
  constructor(private productService = new ProductService()) { }

  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.getAll();
      res.status(200).json(products);
    } catch (e) {
      next(e as IStatusError);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const result = await this.productService.create(body as IProduct);
      res.status(201).json(result);
    } catch (e) {
      next(e as IStatusError);
    }
  };
}