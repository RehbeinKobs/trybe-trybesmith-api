import express from 'express';
import bodyParser from 'body-parser';
import ProductController from './controllers/product.controllers';
import handleError from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(bodyParser.json());

const productController = new ProductController();

app.get('/products', productController.getAll);
app.post('/products', productController.create);

app.use(handleError);

export default app;
