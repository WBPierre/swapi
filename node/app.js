'use strict';

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const userRoutes = require('./routes/userRoutes');
const dataRoutes = require('./routes/dataRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const hostname = "127.0.0.1";
const port = 3000;

try{
    userRoutes(app);
    dataRoutes(app);
    const server = app.listen(port, hostname, function() {
        console.log('Express server listening on ' + server.address().address+":"+server.address().port);
    });
}catch (e){
    console.log(e.message);
}

