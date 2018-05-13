(function(){
    var app = angular.module('IC', []);    
    app.controller('EventC', function($http){
        this.city = {};
        this.events = {};
        var self = this;
        this.findEvents = function() {
            console.log('finding events');
            $http.post('/Events', this.city)
            .then(function(data){
                self.events = {};
                self.events = data.data.events;
                console.log(self.events);
            });   
        };
        /*this.convertDate = function(){
            return '1'
        }*/

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
    
   