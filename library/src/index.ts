import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';


import errorMiddleware from './middleware/error';

import indexApiRouter from './routes/api/index';


// const COOKIE_SECRET = process.env.COOKIE_SECRET;

const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'olga';
const PasswordDB = process.env.DB_PASSWORD || '523896';
const NameDB = process.env.DB_NAME || 'book_database'

const app = express();


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set("view engine", "ejs");
app.set('views', 'src/views');

app.use('/src/public', express.static(__dirname+"/public"));

// app.use(require 'express-session')({
//     secret: COOKIE_SECRET,
//     resave: false,
//     saveUninitialized: false,
// }))


app.use('/api/book', indexApiRouter);

app.use(errorMiddleware)


// const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/'


async function start() {
    try {
        await mongoose.connect(`mongodb+srv://${UserDB}:${PasswordDB}@cluster0.rhhgpyk.mongodb.net/${NameDB}?retryWrites=true&w=majority`);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}


start();