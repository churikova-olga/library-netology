const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')
const bodyParser = require('body-parser')
const flash = require('connect-flash');

const errorMiddleware = require('./middleware/error');

const indexApiRouter = require('./routes/api/index');
const indexRouter = require('./routes/book');
const userRouter = require('./routes/user');
const userAPIRouter = require('./routes/api/userAPI');
const homeRouter = require('./routes/index');

const COOKIE_SECRET = process.env.COOKIE_SECRET

const http = require('http');
const socketIO = require('socket.io');

const Comment = require("./models/Comment");




const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set("view engine", "ejs");
app.set('views', 'src/views');

io.on('connection', (socket) => {
    const {id} = socket;
    console.log(`Socket connected: ${id}`);


    // работа с комнатами
    const {roomName} = socket.handshake.query;
    console.log(`Socket roomName: ${roomName}`);
    socket.join(roomName);

    socket.on('message-to-room',async (msg) => {
        msg.type = `room: ${roomName}`;
        if(roomName) {
            const comment = new Comment({username: msg.username, idBook: msg.book, text: msg.text, date:  msg.date});
            try {
                await comment.save();
            } catch (e) {
                console.error(e);
            }
        }

        socket.to(roomName).emit('message-to-room', msg);
        socket.emit('message-to-room', msg);
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`);
    });
});


app.use('/src/public', express.static(__dirname+"/public"));
console.log(__dirname+"/public")

app.use(require('express-session')({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

require('./passport-config')(passport);


app.use('/', homeRouter);
app.use('/book', indexRouter);
app.use('/api/book', indexApiRouter);
app.use('/api/user', userAPIRouter);
app.use('/user', userRouter);




app.use(errorMiddleware)



const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || '12345';
const NameDB = process.env.DB_NAME || 'book_database'
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/'


async function start() {
    try {

        await mongoose.connect(HostDb, {
            user: UserDB,
            pass: PasswordDB,
            dbName: NameDB,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}


start();