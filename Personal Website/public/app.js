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
            mainSkills: 'Angular.js, Boostrap, HTML, CSS',
            size: '20'
        },
        {
            name: 'Integrated Calendar',
            date: 'May - June 2018',
            description: "I designed a website that integrates one's Gmail calendar with a public database of events from EventBrite. This enables them to find events that fit their schedule and allows them to their calendar. The website also has sorting capabilities based on categories",
            mainSkills: 'Angular.js, Boostrap, HTML, CSS, Google Calendar API, Google Authentication API, Eventbrite API'
        },
        {
            name: 'Personal Accountant',
            date: 'June - July 2018',
            description: "I designed a website that allows users to create an account and have a platform where that can help them budget their money. In the website, users can enter their expenses, income, and a targeted budget. The website will store this information in a database and display the information to the user in the form of graphs and tables. This platform will both be in two forms: a website and native mobile application.",
            mainSkills: 'Mean Stack (MongoDB, Express.js, Angular 5, Node.js), ReactNative.js'
        },
        {
            name: 'Entrepreneurial Platform',
            data: 'July - August 2018',
            description: "I designed a platform that allows entrepreneurs to publicize their project ideas and easily find people of different skillsets. I created this platform both as a website and a native mobile application. The website also contains a chat box to allows users to easily communicate with the entrepreneurs about the project.",
            mainSkills: "MEAN Stack (MongoDB, Express.js, Angular 5, Node.js), Android Mobile SDK (Java)"
        
        }
    ];

    app.controller('ResumeController', function(){
        this.edu = education;
        this.sk = skills;        
    });

    var education = [
        {
            name: ' University of Michigan',
            expectedGraduation: ' April 2020',
            Degree: 'Bachelors of Science in Engineering in Computer Engineering, Minor in Entrepreneurship',
            GPA: '3.5',
            RelevantCourse: 'EECS 203 (Discrete Math), EECS 281 (Data Structure and Algorithms), EECS 270 ( Logic Design), EECS 492 (Artificial Intelligence), EECS 370 (Computer Organization)',
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

    var skills = [
        {
            name: 'High Level Coding Languages',
            Languages: 'C++, Python, MATLAB',
        },
        {
            name: 'Web Development',
            Languages: 'HTML, JavaScript, Angular, Meteor, Three.js, Node.js, Bootstrap, mongoDB, Mongoose',
        },
        {
            name: 'Mobile Development',
            Languages: 'React Native',
        },
        {
            name: "Machine Learning",
            Languages: 'TensorFlow',
        },
        {
            name: 'Sripting Languages',
            Languages: 'PowerShell, Bash',
        },
        {
            name: 'Hardware Languages',
            Languages: 'Verilog, Assembly',
        },
        {
            name: 'FPGAs',
            Languages: 'Altera, Arduino, Raspberry Pi',
        },
        {
            name: 'Microsoft Office',
            Languages: 'Microsoft Word, Microsoft PowerPoint, Microsoft Excel (Advanced Skills: Pivot Tables, Macros)',
        },
        {
            name: 'Languages Spoken',
            Languages: 'English, Spanish, Tamil, Telugu'
        },
        {
            name: 'Soft Skills',
            Languages: 'Communication, Leadership'
        }
    ];


    app.controller('ExperienceController', function(){
        this.ex = jobs;
        this.re = research;
        this.ext = extracurriculars;
    });

    var jobs = [
        {
            name: 'Human Computer Interaction Institute (HCII) at Carnegie Mellon',
            dates: 'May - August 2018',
            position: 'Researcher',
            task1: 'Designed a cognitive assistant system that would use machine learning to analyze video data gathered by a Kinect depth camera to classify different exercises.',
            task2: 'Conducted an experiment to determine whether a single frame analysis of an exercise or a multiple frame analysis (full sequence of exercise) provided more accurate and efficient results to predict a future exercise.',
            task3: 'This system performs in real time and can provide feedback to back therapy patients to perform the certain exercises better.',
            task4: ''
        },
        {
            name: 'Geodis',
            dates: 'June - August 2017',
            position: 'IT Intern in the Network Infrastructure Team',
            task1: 'Shadowed the IT infrastructure team and gained an understanding of network infrastructure and the importance it plays with software development; also gained a deeper understanding of the future of network infrastructure with different cloud models.',
            task2: 'Set up Virtual Machines by downloading different operating systems on each; set up a virtual machine to host Active Directory.',
            task3: 'Used PowerShell to write a script that enabled the security team to remove workers from Active Directory given a text file.',
            task4: 'Created a simple webpage that outlines important IT events in a given year’s calendar.'
        },
        {
            name: 'Sarah Cannon Cancer Research Institute',
            dates: 'June - August 2016',
            position: 'Intern, Financial Planning and Analytics',
            task1: 'Worked with the financial team to analyze and create pivot tables and spreadsheets to budget for the company’s 2017 expenses using Microsoft Excel, Enterprise, and ArcPlan.',
            task2: 'Gathered data about potential markets for the company and created PowerPoints, graphs, and charts to highlight this data, which was then presented to the VPs, RVPs, and the upper management of the company.',
            task3: '',
            task4: ''
        }
    ];

    var research = [
        {
            name: 'CROMA Lab, Robo Affordances',
            dates: 'October 2017 - Present',
            position: 'Undergraduate Research Assistant',
            task1: 'Conducting research to create a user interface that allows crowd-workers to analyze a scene in real-time and provide sufficient information to populate an affordance template for robots.',
            task2: 'Implementing different design features using Three.js that enables the crowd-workers to draw a path to outline the movement of an object given a 3D point plane.',
        }
    ];

    var extracurriculars = [
        {
            name: 'M-Heal, Clear Lung Project',
            dates: 'September 2016 - Present',
            position: 'Hardware Team, Software Team',
            task1: 'Developing a device that uses machine learning to analyze cough and lung sounds to be able to detect pneumonia in children in underdeveloped countries.',
            task2: 'Writing Python scripts to develop the classifiers for analyzing Pneumonia lung sounds. Using Tfresh and Tpot Library.'
        },
        {
            name: 'Mpact Investing',
            dates: 'January 2018 - Present',
            position: 'Member of Fintech Team',
            task1: 'Investing in cryptocurrencies that can provide a reward but also has a positive impact to society.',
            task2: 'Wrote a paper for the Kresge Foundation to prove the benefits of blockchain technology on microfinancing.'
        },
        {
            name: 'M-Hacks',
            dates: 'October 2017 - Present',
            position: 'Team Member',
            task1: 'Developed a website to integrate Linedln, Google Calendar, and Facebook Events. Did not complete so finished the project on my own.'
        },
        {
            name: 'IEEE',
            dates: 'September 2016 - Present',
            position: 'Member',
        },
        {
            name: 'IASA',
            dates: 'September 2016 - Present',
            position: 'Member',
        }
    ];

    
})();