const express = require('express');

const PORT = process.env.PORT || 3000

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

app.listen(PORT, () => {
    console.log(`=== start server PORT ${PORT} ===`);
});
