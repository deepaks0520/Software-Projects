const request = require('request');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));  

app.use("/scripts",  express.static(__dirname + '/public'));
app.use("/style",  express.static(__dirname + '/public'));
app.use("/images",  express.static(__dirname + '/public/images'));


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/DeepakSubramanian.html'));
    console.log('Main Path');
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
 })