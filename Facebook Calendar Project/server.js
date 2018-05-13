const request = require('request');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users


app.set('view engine', 'ejs');

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/mainCalendar.html'));
    console.log('Main Path');
})

app.listen(4000, function () {
   console.log('Example app listening on port 4000!')
})


app.post('/Events', function (req, res) {
    let city = req.body.text; 
    console.log(city);  
    let url = `https://www.eventbriteapi.com/v3/events/search/?q=${city}&sort_by=date&token=H5ZSJRRYBV24CSNEURFI`;
    
    request(url, function (err, response, body) {
        if (err){
            console.log('error:', err);
        }
        else{
            //console.log(body);
            let events = JSON.parse(body)
            console.log(events.events[0].name.text);
            console.log(events.events[0].category_id);
            res.send(events);
        }
    
    });    
  })