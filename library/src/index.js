const express = require('express');
const mongoose = require('mongoose');



const errorMiddleware = require('./middleware/error');

const indexApiRouter = require('./routes/api');
const indexRouter = require('./routes/book');
const userRouter = require('./routes/user');
const homeRouter = require('./routes/index');

const app = express();

app.set("view engine", "ejs");
app.set('views', 'src/views');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/src/public', express.static(__dirname+"/public"));
console.log(__dirname+"/public")

app.use('/', homeRouter);
app.use('/book', indexRouter);
app.use('/api/book', indexApiRouter);
app.use('/api/user', userRouter);

app.use(errorMiddleware)

const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || '12345';
const NameDB = process.env.DB_NAME || 'book_database'
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/'
console.log(NameDB)
async function start() {
    try {

        await mongoose.connect(HostDb, {
            user: UserDB,
            pass: PasswordDB,
            dbName: NameDB,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();