import express from "express";
import 'dotenv/config';
import { Connection } from './loaders/Connection';
import { Middleware } from './loaders/Middleware';

const app = express();

// Middleware initialization
const middleware = new Middleware(app, express);
middleware.init();

// Routes
app.get('/test', (req, res) => res.json({ msg: 'Hello from AWS! This application was last updated on Wednesday, April 8th, 2020' }));

// Authenticate database and launch server
const connection = new Connection(app, express);
connection.authenticate();