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
            date: '3/3/18',
            description: 'I designed a personal website to show my portfolio of skills and projects',
            mainSkills: 'Angular.js, Boostrap, html, css, javaScript.'
        },
        {
            name: 'Personal Website',
            date: '3/3/18',
            description: 'I designed a personal website to show my portfolio of skills and projects',
            mainSkills: 'Angular.js, Boostrap, html, css, javaScript.'
        }
    ];
})();