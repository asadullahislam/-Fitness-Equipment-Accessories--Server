import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { productRouter } from './app/modules/Products/product.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// routes
app.use('/api/products', productRouter);

const getAController = (req: Request, res: Response) => {
  res.send('server is Running...');
};

app.get('/', getAController);

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
  });
});

export default app;
