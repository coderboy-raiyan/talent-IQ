import cookieParse from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { join } from 'path';
import config from './config';
const app = express();

app.use(express.json());
app.use(cookieParse());
app.use(cors({ origin: '*', credentials: true }));

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Server is healthy!',
    });
});

if (config.NODE_ENV === 'production') {
    app.use(express.static(join(process.cwd(), '../client/dist')));

    app.get('/{*any}', (req, res) => {
        res.sendFile(join(process.cwd(), '../client/dist/index.html'));
    });
}

export default app;
