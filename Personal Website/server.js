const request = require('request');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public', { maxAge: 86400000 /* 1d */ }));  

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/DeepakSubramanian.html'));
    console.log('Main Path');
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
 })