import 'reflect-metadata';

import express from 'express';
import routes from './routes';
import cors from 'cors';

import './database';

const app = express();

app.use(express.json());

app.use((req,res,next) => {
    
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", ['Content-Type', 'Authorization']);
    
    app.use(cors());
    next();
}) 

app.use(routes);

app.listen(3333, () => {
    console.log('🚀 Server started on port 3333!')
})