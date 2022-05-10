const express = require('express');

const PORT = process.env.PORT || 3000

const errorMiddleware = require('./middleware/error');

const indexApiRouter = require('./routes/api/index');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const app = express();

app.set("view engine", "ejs");

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/public', express.static(__dirname+"/public"));

app.use('/book', indexRouter);
app.use('/api/book', indexApiRouter);
app.use('/api/user', userRouter);

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`=== start server PORT ${PORT} ===`);
});
