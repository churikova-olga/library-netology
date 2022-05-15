const express = require('express');
const request = require('request');
const redis = require('redis');

const PORT = process.env.PORT || 3001

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost'

const client = redis.createClient({url:REDIS_URL});

(async ()=>{
     await client.connect();

})();


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/counter/:id', async (req, res) => {
    const {id} = req.params;

    let counter = await client.get(id)
    if(counter === null) {
        await client.set(id, 1);
        counter =  1;
    }

    res.json(counter)
    // получает значение счётчика
});

app.post('/counter/:id/incr', async (req, res) => {

    const {id} = req.params;

     const cnt = await client.incr(id)
     res.json(cnt)
//увеличивает счётчик и выдает результат

});

app.listen(PORT, () => {
    console.log(`=== start server PORT ${PORT} ===`);
});
