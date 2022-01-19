import express, { Application } from 'express';
import morgan from 'morgan';
import http from 'http';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import routes from './routes/v1';

const app: Application = express();

app.use(morgan('dev'));
const server = http.createServer(app);

// parse body params and attach them to req.body
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// mount api v1 routes
app.use('/v1', routes);

export default server;
