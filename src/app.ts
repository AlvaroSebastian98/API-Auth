process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

// Env files
import dotenv from 'dotenv';

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});

import express, { json } from 'express';
import { loadControllers } from 'awilix-express';
import container from './container';

const app: express.Application = express();

// JSON Middleware
app.use(json());
app.use(express.urlencoded({ extended: false }));

// Container
container(app);

// Controllers: define controllers path
app.use(loadControllers(
    'controllers/*.ts',
    { cwd: __dirname })
);

export { app };