const express = require('express');
const PORT = process.env.PORT || 3000

const Book = require('./models/Book')

const stor = {
    book: [],
};

const user ={
    id: 1,
    mail: "test@mail.ru"
}

const app = express()

app.use(express.urlencoded({ extended: true }));

app.post('/api/user/login', (req,res)=>{
    res.status(201);
    res.json(user);
})

app.post('/api/books', (req, res)=>{

    const {title, description, authors, favorite, fileCover, fileName} = req.body;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
    stor.book.push(newBook);

    res.status(201);
    res.json(newBook);
})


app.get('/api/books', (req, res)=>{
    const {book} = stor;
    res.json(book);
})

app.get('/api/books/:id', (req,res)=>{
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json("todo | not found");
    }
})

app.put('/api/books/:id', (req,res)=>{
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    if (idx !== -1) {

        book[idx] = {
            ...book[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        }
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json("todo | not found");
    }
})

app.delete('/api/books/:id', (req,res) =>{
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);
    if (idx !== -1) {
        book.splice(idx, 1);
        res.json('OK');
    } else {
        res.status(404);
        res.json("todo | not found");
    }
})
app.listen(PORT, ()=> {
    console.log(`Server has been started ${PORT}`)
})
