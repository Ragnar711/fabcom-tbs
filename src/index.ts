import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import router from './routes/User';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(helmet());
app.use(compression());
app.use(express.json());

app.disable('x-powered-by');

app.use('/api/v1', router);

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((_req: Request, res: Response, _next: NextFunction) => {
    res.status(404).send('Sorry, that route does not exist.');
});

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${port}`);
});
