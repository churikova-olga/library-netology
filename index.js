const express = require('express');

const PORT = process.env.PORT || 3000

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const errorMiddleware = require('./middleware/error');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/public', express.static(__dirname+"/public"));

app.use('/api/books', indexRouter);
app.use('/api/user', userRouter);

app.use(errorMiddleware)

app.listen(PORT, ()=> {
    console.log(`Server has been started ${PORT}`)
})
