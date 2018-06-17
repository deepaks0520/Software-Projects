const request = require('request');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

var {google} = require('googleapis');
const ClientId = "928412217018-l5ckke4n65ghdv1ft2eh2rpk8gb133sb.apps.googleusercontent.com";
const ClientSecret = "wFJd-BtcsIvQuSobkLqmEyrF";
const RedirectionUrl = "http://localhost:4000/oauthCallback";

var oauth2Client;
var TokenTemp;
var signedIn = 0;

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users


app.set('view engine', 'ejs');

app.listen(4000, function () {
    console.log('Example app listening on port 4000!')
})

app.get('/', function (req, res) {
    //res.sendFile(path.join(__dirname+'/public/mainCalendar.html'));
    res.sendFile(path.join(__dirname+'/public/WelcomePage.html'));    
    console.log('Welcome Page');
})

app.use('/welcomeP', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/WelcomePage.html'));    
    console.log('Welcome Page S');
})

app.get('/afterSign', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/mainCalendar.html'));
    console.log('Main Page');
})

app.get('/checkSign', function(req,res){
    console.log('checking signIn on load');
    console.log(signedIn);
    if (signedIn == 1){
        res.send('1');
    }
    else if (signedIn != 1){
        res.send('0');
    }
})

app.post('/signIn', function(req, res){
    console.log("Redirecting to Google Sign In");
    var url = getAuthUrl();
    res.send(url);
})

app.post('/findEvents', function (req, res) {
    let city = req.body.text; 
    console.log(city);  
    let url = `https://www.eventbriteapi.com/v3/events/search/?q=${city}&sort_by=date&token=H5ZSJRRYBV24CSNEURFI`;
    
    request(url, function (err, response, body) {
        if (err){
            console.log('error:', err);
        }
        else{
            console.log("Showing Events");
            let events = JSON.parse(body)
            res.send(events);
        }
    
    });    
})

app.post('/findEventsLocation', function (req, res) {
    let latitude = req.body.latitude;
    let longitude = req.body.longitude; 
    console.log(latitude, longitude);  
    let url = `https://www.eventbriteapi.com/v3/events/search/?sort_by=-date&location.within=10mi&location.latitude=${latitude}&location.longitude=${longitude}&token=H5ZSJRRYBV24CSNEURFI`;    
    request(url, function (err, response, body) {
        if (err){
            console.log('error:', err);
        }
        else{
            console.log("Showing Events");
            let events = JSON.parse(body)
            res.send(events);
        }
    });    
})

app.post('/addNew', function (req, res){
    console.log("Adding New Event");        
    addNewEvents(oauth2Client, req.body.name, req.body.description, req.body.timeZone, req.body.start, req.body.end);    
    res.send('1');
})

app.get('/displayCalendar', function(req,res){
  console.log("Displaying Events");        
  listEvents(oauth2Client, function(ret){
       res.send(ret);
   });
});

//Added For testing
function getOAuthClient() {
    return new google.auth.OAuth2(ClientId, ClientSecret, RedirectionUrl);
}

function getAuthUrl() {
    var oauth2Client = getOAuthClient();
    var scopes = [
        'https://www.googleapis.com/auth/calendar'
    ];

    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });

    return url;
}

app.use("/oauthCallback", function(req, res) {
    oauth2Client = getOAuthClient();
    var session = req.session;
    var code = req.query.code;
    oauth2Client.getToken(code, function(err, token) {
        if (err){
            signedIn = 0;
            console.log("problem");
            res.redirect("http://localhost:4000/");                           
        }
        else {
            signedIn = 1;
            oauth2Client.setCredentials(token);
            TokenTemp = token;
            res.redirect("http://localhost:4000/afterSign");               
        }
    });  
});

function listEvents(auth, cb) {
    const calendar = google.calendar({version: 'v3', auth});
   
    calendar.calendars.get({
        calendarId: 'primary',
      }, (err, {data}) => {
        if (err) {
            console.log('The API returned an error: ' + err);
            return err;
        }
        const info = data.id;
        cb(info);
      });
      
  }

    function addNewEvents(auth, eventName, eventDescription, eventTimeZone, eventTimeStart, eventTimeEnd) {
        var event = {
            'summary': eventName,
            'description': eventDescription,
            'start': {
              'dateTime': eventTimeStart,
              'timeZone': 'America/Los_Angeles',
            },
            'end': {
              'dateTime': eventTimeEnd,
              'timeZone': 'America/Los_Angeles',
            },
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
              ],
            },
          };
    
          const calendar = google.calendar({version: 'v3', auth});  
          calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            resource: event,
          }, function(err, event) {
            if (err) {
              console.log('There was an error contacting the Calendar service: ' + err);
              return;
            }
            console.log('Event created: %s', event.summary);
          });
        }
