import express from 'express';
import http from 'http';
import bodyParser from 'body-parser'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ;
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import { isauthenticated} from './middlewares';

const app = express();

app.use(cors({credentials:true,}));
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', router());

const server=http.createServer(app);

server.listen(8080, ()=>{
    console.log('server running on http:/localhost:8080/');
});
const MONGO_URL='mongodb+srv://Chimebuka:Ebukanian@cluster0.svbypgg.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));