import express from 'express';
import bodyParser from 'body-parser';
import ProductController from './controllers/product.controllers';
import UserController from './controllers/user.controllers';
import OrderController from './controllers/order.controller';
import handleError from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(bodyParser.json());

const productController = new ProductController();

app.get('/products', productController.getAll);
app.post('/products', productController.create);

const userController = new UserController();

app.post('/users', userController.create);
app.post('/login', userController.login);

const orderController = new OrderController();

app.get('/orders', orderController.getAll);

app.use(handleError);

export default app;
