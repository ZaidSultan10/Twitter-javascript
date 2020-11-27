const { default: Axios } = require('axios');
const { response } = require('express');
const express = require('express');
const app = express();
const port = 3000;
const Twitter = require('./api/helpers/twitter');
const twitter = new Twitter();
require('dotenv').config();

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

app.get('/tweets', (req, res) => {
    console.log(req.query)
    const query = req.query.q;
    const count = req.query.count;
    const maxId = req.query.max_id;
    console.log(process.env.TWITTER_API_TOKEN);
    
    twitter.get(query,count,maxId).then((response) =>{
        res.status(200).send(response.data); 
    }).catch((error) =>{
        res.status(400).send(error);
    })
})

app.listen(port, () => console.log(`Twitter API Listening to Port ${port}!`));