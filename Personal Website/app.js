(function(){
    var app = angular.module('personalWebsite', []);

    app.controller("TabController", function(){
        this.tab = 1;
        this.selectTab = function(setTab){
            this.tab = setTab;
        };
        this.isSelected = function (checkTab){
            return this.tab === checkTab;
        };
    });

    app.controller('ProjectController', function(){
        this.projects = projs;
    });

    var projs = [
        {
            name: 'Personal Website',
            date: 'May - August 2018',
            description: 'I designed a personal website to show my portfolio of skills and projects',
            mainSkills: 'Angular.js, Boostrap, html, css, javaScript'
        },
        {
            name: 'Integrated Calendar',
            date: 'May - August 2018',
            description: "I designed a website that integrates one's Gmail calendar with one Facebook and Linkedln Events. This enables them to find events that fit their schedule and allows them to their calendar.",
            mainSkills: 'Angular.js, Boostrap, html, css, javaScript, Gmail APIs, Facebook APIs, Linkedln APIs'
        }
    ];
})();