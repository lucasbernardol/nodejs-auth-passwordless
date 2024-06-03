import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import express from 'express';
import helmet from 'helmet';

import morgan from 'morgan';

import cors from 'cors';
import hpp from 'hpp';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(helmet())
app.use(cors());

app.use(hpp()); // Ignoring -> token=x&token=y -> token = [x,y]

app.set(express.static(path.resolve(__dirname, '..', 'public', 'static')));

app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '..', 'public', 'views'));

export { app };
