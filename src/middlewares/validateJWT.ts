import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserService from '../services/user.service';

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
    const { id } = decoded.data;
    const users = await userService.getAll();
    if (users.every((u) => u.id !== id)) throw new Error();
    next(id);
  } catch (_e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default validateJWT;
