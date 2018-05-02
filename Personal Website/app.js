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
            description: "I designed a website that integrates one's Gmail calendar with one Facebook and Linkedln Events. This enables them to find events that fit their schedule and allows them to their calendar. Also created a mobile application where one can have the same functionality.",
            mainSkills: 'Angular.js, Boostrap, html, css, javaScript, Gmail APIs, Facebook APIs, Linkedln APIs'
        },
        {
            name: 'Health Related CS Project',
            date: 'May - August 2018',
            description: "IDK yet",
            mainSkills: ' Not Sure'
        }
    ];

    app.controller('ResumeController', function(){
        this.edu = education;
    });

    var education = [
        {
            name: ' University of Michigan',
            expectedGraduation: ' April 2020',
            Degree: 'Bachelors of Science in Engineering in Computer Engineering, Minor in Entrepreneurship',
            GPA: '3.5',
            RelevantCourse: 'EECS 203 (Discrete Math), EECS 281 (Data Structure and Algorithms), EECS 270 (Intro to Logic Design), EECS 492 (Artificial Intelligence), EECS 370 (Computer Organization)',
            Highlights: 'Engineering Scholarship of Honors/Geisinger (Academic Excellence), Nashville Alumni Scholarship, Dean’s List, University Honors'
        },
        {
            name: 'Franklin High School',
            expectedGraduation: 'May 2016',
            Degree: 'High School Degree, IB Diploma',
            GPA: '4.7',
            RelevantCourse: 'AP Calculus',
            Highlights: 'Salutatorian, IB Diploma, Gifted Child, Governor’s School of Emerging Technologies'
        },
    ];

    app.controller('ExperienceController', function(){
        this.ex = jobs;
    });

    var jobs = [
        {
            name: 'Human Computer Interaction Institute (HCII) at Carnegie Mellon',
            dates: 'May - August 2018',
            position: 'Researcher',
            task1: '',
            task2: '',
            task3: '',
            task4: ''
        },
        {
            name: 'Geodis',
            dates: 'June - August 2017',
            position: 'IT Intern in the Network Infrastructure Team',
            task1: 'Shadowed the IT infrastructure team and gained an understanding of network infrastructure and the importance it plays with software development; also gained a deeper understanding of the future of network infrastructure with different cloud models',
            task2: 'Set up Virtual Machines by downloading different operating systems on each; set up a virtual machine to host Active Directory',
            task3: 'Used PowerShell to write a script that enabled the security team to remove workers from Active Directory given a text file',
            task4: 'Programmed with HTML and JavaScript to create a webpage that outlines important IT events in given year’s calendar'
        },
        {
            name: 'Sarah Cannon Cancer Research Institute',
            dates: 'June - August 2016',
            position: 'Intern, Financial Planning and Analytics',
            task1: 'Worked with the financial team to analyze and create pivot tables and spreadsheets to budget for the company’s 2017 expenses using Microsoft Excel, Enterprise, and ArcPlan',
            task2: 'Gathered data about potential markets for the company and created PowerPoints, graphs, and charts to highlight this data, which was then presented to the VPs, RVPs, and the upper management of the company',
            task3: '',
            task4: ''
        }
    ]

})();