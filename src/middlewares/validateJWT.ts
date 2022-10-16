import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserService from '../services/user.service';
import throwError from '../utils/throwError';

require('dotenv/config');

const secret = process.env.JWT_SECRET;
const userService = new UserService();

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, secret as string) as JwtPayload;
    const id = await userService.getById(decoded.id);
    if (!id) throw throwError(404, 'id not found');
    next(decoded.id);
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default validateJWT;
