//Imports
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from './core/config/config';
import connectToDb from './server/db/connect';

const port = config.serverPort;
//Connect mongoDb
connectToDb();

const app = express();
app.use(cors());
//Body parser: For accessing values using req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index route
app.get('/', (req, res) => {
    res.send('Invalid endpoint!');
});
//Listen
app.listen(port, () => {
    console.log('server started - ', port);
});