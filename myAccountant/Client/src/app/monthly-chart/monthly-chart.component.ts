import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from "@angular/router";
import {AuthService} from "../services/auth.service"

@Component({
  selector: 'app-monthly-chart',
  templateUrl: './monthly-chart.component.html',
  styleUrls: ['./monthly-chart.component.css']
})
export class MonthlyChartComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) { }
  
  JWT: any
  optIncomeYear: any
  optIncomeMonth: any
  optExpenseYear: any
  optExpenseMonth: any
  
  user = {
    incomeShow: false,
    expenseShow: false,
    expense: [],
    income: [],
    incomeYears: [],
    incomeMonths: [],
    expenseYears: [],
    expenseMonths: []
  }

  incomeChartData = {
    chartType: 'PieChart',
    dataTable: [ ],
    options: {
      legend: {alignment: 'center', position: 'bottom'},
      chartArea: 
        {width:'75%',height:'75%'}, 
      height: 400,
      width: '50%'
    }  
  };

  expenseChartData = {
    chartType: 'PieChart',
    dataTable: [ ],
    options: {
      legend: {alignment: 'center', position: 'bottom'},
      chartArea: 
        {width:'75%',height:'75%'}, 
      height: 400,
      width: '50%'
    }  
  };

 ngOnInit() {
    const  temp = this.route.parent.params.subscribe(res => {
      console.log('month')      
      this.JWT = res['JWT'];
      this.findAccountingInfo()
    });
  }

  findAccountingInfo(){
    this.authService.displayInfo(this.JWT).subscribe(val=>{
      console.log('storing expenses and incomes')
      this.user.expense = val.user.expense
      this.user.income = val.user.income 
      var incomeYears = new Set()
      var incomeMonths = new Set()   
      var expenseYears = new Set()
      var expenseMonths = new Set()   
      var i

      this.user.income.sort(function(a,b){ 
        if (a.date < b.date) {return -1;}
        if (a.date > b.date) {return 1;}
        return 0;
      })

      for (i = 0; i < this.user.expense.length; i++){         
        var newDate = new Date(this.user.expense[i].date)
        expenseYears.add(newDate.getFullYear())
        expenseMonths.add(newDate.getMonth())
        
        if ((newDate.getMonth() + 1) < 10 && newDate.getDate() < 10){
          this.user.expense[i].cdate = "0" + (newDate.getMonth()+1) + '/0' +newDate.getDate() + '/' + newDate.getFullYear()
        }
        else if ((newDate.getMonth() + 1) < 10){
          this.user.expense[i].cdate = "0" + (newDate.getMonth()+1) + '/' +newDate.getDate() + '/' + newDate.getFullYear() 
        }
        else if ((newDate.getDate()) < 10){
          this.user.expense[i].cdate = (newDate.getMonth()+1) + '/0' +newDate.getDate() + '/' + newDate.getFullYear() 
        }
        else {
          this.user.expense[i].cdate = (newDate.getMonth()+1) + '/' +newDate.getDate() + '/' + newDate.getFullYear()
        }
      }

      this.user.expense.sort(function(a,b){ 
        if (a.date < b.date) {return -1;}
        if (a.date > b.date) {return 1;}
        return 0;
      })
      
      for (i = 0; i < this.user.income.length; i++){
        var newDate = new Date(this.user.income[i].date)
        incomeYears.add(newDate.getFullYear())
        incomeMonths.add(newDate.getMonth())        
        
        if ((newDate.getMonth() + 1) < 10 && newDate.getDate() < 10){
          this.user.income[i].cdate = "0" + (newDate.getMonth()+1) + '/0' +newDate.getDate() + '/' + newDate.getFullYear()
        }
        else if ((newDate.getMonth() + 1) < 10){
          this.user.income[i].cdate = "0" + (newDate.getMonth()+1) + '/' +newDate.getDate() + '/' + newDate.getFullYear() 
        }
        else if ((newDate.getDate()) < 10){
          this.user.income[i].cdate = (newDate.getMonth()+1) + '/0' +newDate.getDate() + '/' + newDate.getFullYear() 
        }
        else {
          this.user.income[i].cdate = (newDate.getMonth()+1) + '/' +newDate.getDate() + '/' + newDate.getFullYear()
        }
      }

      this.user.incomeYears = Array.from(incomeYears)
      this.user.incomeMonths = Array.from(incomeMonths)
      this.user.expenseYears = Array.from(expenseYears)
      this.user.expenseMonths = Array.from(expenseMonths)

      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

      this.optIncomeMonth = this.user.incomeMonths[this.user.incomeMonths.length - 1]
      this.optIncomeMonth = monthNames[this.optIncomeMonth]
      this.optIncomeYear = this.user.incomeYears[this.user.incomeYears.length - 1]

      this.optExpenseMonth = this.user.expenseMonths[this.user.expenseMonths.length - 1]
      this.optExpenseMonth = monthNames[this.optExpenseMonth]
      this.optExpenseYear = this.user.expenseYears[this.user.expenseYears.length - 1]

      this.convertMonth()
      if(this.user.incomeMonths.length != 0 || this.user.incomeYears.length != 0){
          this.findingIncomeCategories()
      }
      if(this.user.expenseMonths.length != 0 || this.user.expenseYears.length != 0){
          this.findingExpenseCategories()
      }
      console.log(this.user)  

    })
  }

  convertMonth(){

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    var i
    for (i = 0; i < this.user.expenseMonths.length; i++){
      this.user.expenseMonths[i] = monthNames[this.user.expenseMonths[i]]
    }
    for (i = 0; i < this.user.incomeMonths.length; i++){
      this.user.incomeMonths[i] = monthNames[this.user.incomeMonths[i]]
    }
  }

  findingIncomeCategories(){
    console.log("updating graphs")
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    var month = monthNames.indexOf(this.optIncomeMonth)

    var previousMonth = new Date(this.optIncomeYear, month, 1).toISOString()
    var nextMonth = new Date(this.optIncomeYear, month+1, 1).toISOString()
    
    var graphCategories = []
    var graphCosts = []

    console.log(previousMonth, nextMonth)

    var i
    for (i = 0; i < this.user.income.length; i++){
      if (this.user.income[i].date >= previousMonth && this.user.income[i].date < nextMonth){
        if (graphCategories.indexOf(this.user.income[i].category) != -1){
           graphCosts[graphCategories.indexOf(this.user.income[i].category)] = graphCosts[graphCategories.indexOf(this.user.income[i].category)] + this.user.income[i].cost 
        }
        else {
          graphCategories.push(this.user.income[i].category)
          graphCosts.push(this.user.income[i].cost)
          
        }
      }
    }
    var tempData = []
    var temp = []
    temp.push("Category")
    temp.push("Amount Earned")
    tempData.push(temp)
    for (i = 0; i < graphCategories.length; i++){
      var temp = []
      temp.push(graphCategories[i])
      temp.push(graphCosts[i])
      tempData.push(temp)
    }

    console.log(tempData)

    this.incomeChartData = {
      chartType: 'PieChart',
      dataTable: tempData,
      options: {
        legend: {alignment: 'center', position: 'bottom'},
        chartArea: 
          {width:'75%',height:'75%'}, 
        height: 400,
        width: '50%'
      }
    };
    this.user.incomeShow = true;

  }

  findingExpenseCategories(){
    console.log("updating graphs")
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    var month = monthNames.indexOf(this.optExpenseMonth)

    var previousMonth = new Date(this.optExpenseYear, month, 1).toISOString()
    var nextMonth = new Date(this.optExpenseYear, month+1, 1).toISOString()
    
    var graphCategories = []
    var graphCosts = []

    console.log(previousMonth, nextMonth)

    var i
    for (i = 0; i < this.user.expense.length; i++){
      if (this.user.expense[i].date >= previousMonth && this.user.expense[i].date < nextMonth){
        if (graphCategories.indexOf(this.user.expense[i].category) != -1){
           graphCosts[graphCategories.indexOf(this.user.expense[i].category)] = graphCosts[graphCategories.indexOf(this.user.expense[i].category)] + this.user.expense[i].cost 
        }
        else {
          graphCategories.push(this.user.expense[i].category)
          graphCosts.push(this.user.expense[i].cost)
          
        }
      }
    }
    var tempData = []
    var temp = []
    temp.push("Category")
    temp.push("Amount Spent")
    tempData.push(temp)
    for (i = 0; i < graphCategories.length; i++){
      var temp = []
      temp.push(graphCategories[i])
      temp.push(graphCosts[i])
      tempData.push(temp)
    }

    console.log(tempData)

    this.expenseChartData = {
      chartType: 'PieChart',
      dataTable: tempData,
      options: {
        legend: {alignment: 'center', position: 'bottom'},
        chartArea: 
          {width:'75%',height:'75%'}, 
        height: 400,
        width: '50%'
      }
    };

    this.user.expenseShow = true 
  }
}
