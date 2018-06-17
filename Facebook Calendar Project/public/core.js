(function(){
    var app = angular.module('IC', []);    
    app.controller('EventC', function($http, $window, $sce){
        this.city = {};
        this.showCityName = {};
        this.events = {};
        this.Signed = 0;
        this.find = 0;
        var self = this;
        
        this.checkSign = function(){
            console.log('checking signIn on load');
            $http.get('/checkSign')
            .then(function(data){
                if (data.data == 1){
                    self.Signed = 1;
                    console.log(self.Signed);                                                                
                }
                else if (data.data != 1){
                    self.Signed = 0;
                    console.log(self.Signed);                                                               
                }
            });
        };

        this.signIn = function() {
            console.log ('signing in');
            $http.post('/signIn')
            .then(function(data){
                self.url = data.data;
                $window.open(self.url, "_self");
            });
        };

        this.signOut = function(){
            self.Signed = 0;
            $http.get('/signOut')
            .then(function(data){

                console.log("redirect")
            }); 
            $window.open("http://localhost:4000/welcomeP", "_self");
               
        }

        this.getLocation = function(){
            if (navigator.geolocation) {
                console.log("Finding Nearby Events")
                navigator.geolocation.getCurrentPosition(self.showPosition);
            } else { 
                console.log("No Permission");
            }
        }

        this.showPosition = function(position){
            self.find = 1;        
            temp = {text: "Current Location"}
            self.showCityName = temp;
            var location = {latitude: position.coords.latitude, longitude: position.coords.longitude};
            $http.post('/findEventsLocation', location)
            .then(function(data){
                self.events = {};
                self.events = data.data.events;
                for (var i = 0; i < self.events.length; i++){
                    self.events[i].index = i;
                }
            });
        }

        this.findEvents = function() {
            self.find = 1;
            self.showCityName = this.city;
            console.log('Finding Events by City');
            $http.post('/findEvents', this.city)
            .then(function(data){
                self.events = {};
                self.events = data.data.events;
                for (var i = 0; i < self.events.length; i++){
                    self.events[i].index = i;
                }
                self.city = {};
            });   
        };

        this.hideEvents = function(){
            self.find = 0;
            console.log('hiding events');
            self.events = {}  
        }

        this.addNewEvents = function(inputIndex) {
            console.log('adding new event');
            var eventInfo = {'name': self.events[inputIndex].name.text, 
            'description': self.events[inputIndex].url, 
            'timeZone': self.events[inputIndex].start.timezone,
            'start': self.events[inputIndex].start.local, 
            'end':self.events[inputIndex].end.local};
            $http.post('/addNew', eventInfo)
            .then(function(data){
                document.getElementById('myCal').src = document.getElementById('myCal').src;                console.log(eventInfo);
            });
        };

        this.showEvents = function(){
            console.log('show');
            $http.get('/displayCalendar')
            .then(function(data){
                self.showCal = 1;
                self.id = data.data;
                self.id = self.id.replace('@', '%40');
                self.calUrl = `https://calendar.google.com/calendar/embed?src=${self.id}&ctz=America%2FChicago`;
                self.calUrl = $sce.trustAsResourceUrl(self.calUrl);
            });
        };

        this.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }

        this.convertDate = function(start, end){
            var date1 = new Date(start);
            var day1 = date1.getDate();
            var month1 = date1.getUTCMonth() + 1;
            var year1 = date1.getFullYear();
            var fullDate1 = month1 + '/' + day1 + '/' + year1;


            var date2 = new Date(end);
            var day2 = date2.getDate();
            var month2 = date2.getUTCMonth() + 1;
            var year2 = date2.getFullYear();
            var fullDate2 = month2 + '/' + day2 + '/' + year2;

            if (fullDate1 == fullDate2){
                return fullDate1;
            }
            return fullDate1 + ' - ' + fullDate2;
        }

        this.convertTime = function(start){
            var time = new Date(start);
            var hour = time.getHours();
            var minutes = time.getMinutes();
            if (hour == 12){
                if (minutes < 10){
                return hour + ":0" + minutes + 'PM';
                }
                return hour + ":" + minutes + 'PM';
            }
            else if (hour == 24){
                if (minutes < 10){
                return 12 + ":0" + minutes + 'AM';
                }
                return 12 + ":" + minutes + 'AM';
            }
            else if (hour > 12 ){
                hour = hour % 12 + 1;
                if (minutes < 10){
                return hour + ":0" + minutes + 'PM';
                }
                return hour + ":" + minutes + 'PM';
            }
            else{
                if (minutes < 10){
                return hour + ":0" + minutes + 'AM';
                }
                return hour + ":" + minutes + 'AM';
            }
        }

    });
})();
    
   