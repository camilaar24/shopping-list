var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

mongoose.connect('mongodb://localhost:27017/shoppinglist');

mongoose.connection.on('connected',()=>{
    console.log('Connected to database mongodb @ 27017')
})

mongoose.connection.on('error',(err)=>{
    if(err)
    {
        console.log('Error in Database connection:'+err);
    }
});

const port = 3000;

app.use(cors());

app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route);

app.get('/',(req, res)=>{
    res.send('shopping-list');
});

app.listen(port,()=>{
    console.log('Server started at port: ' +port);
});