import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from "@angular/router";
import {AuthService} from "../services/auth.service"

@Component({
  selector: 'app-yearly-chart',
  templateUrl: './yearly-chart.component.html',
  styleUrls: ['./yearly-chart.component.css']
})
export class YearlyChartComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) { }
  
  JWT: any
  optYear: any
  user = {
    expense: [],
    income: [],
    show: false,
    totalYears: []
  }

  totalSummary = {
    chartType: 'ColumnChart',
    dataTable: [],
    options: {title: 'Yearly Summary', width: '50%', height: 500, chartArea:{width: '70%', height: '100%'}}
  };

 ngOnInit() {
    const  temp = this.route.parent.params.subscribe(res => {
      this.JWT = res['JWT'];
      console.log('year')
      this.findingYearInformation()
    });
  }

  findingYearInformation(){
    this.authService.displayInfo(this.JWT).subscribe(val=>{
      console.log("finding yearlyinfo")
      this.user.expense = val.user.expense
      this.user.income = val.user.income
      console.log(this.user.income)

      var totalYears = new Set()    
      
      this.user.income.sort(function(a,b){ 
        if (a.date < b.date) {return -1;}
        if (a.date > b.date) {return 1;}
        return 0;
      })

      var i 
      for (i = 0; i < this.user.income.length; i++){
        var newDate = new Date(this.user.income[i].date)
        totalYears.add(newDate.getFullYear())
      }
      this.user.totalYears = Array.from(totalYears)

      this.user.expense.sort(function(a,b){ 
        if (a.date < b.date) {return -1;}
        if (a.date > b.date) {return 1;}
        return 0;
      })

      for (i = 0; i < this.user.expense.length; i++){
        var newDate = new Date(this.user.expense[i].date)
        totalYears.add(newDate.getFullYear())
      }
      this.user.totalYears = Array.from(totalYears)

      this.optYear = this.user.totalYears[this.user.totalYears.length - 1]
      this.findingCostsPerMonth()
      this.user.show = true
    })
  }

  findingCostsPerMonth(){
    var dataSummary = []

    var chartHeaders = []
    chartHeaders.push('Month')
    chartHeaders.push('Income')
    chartHeaders.push('Expense')
    chartHeaders.push('Net')

    dataSummary.push(chartHeaders)

        
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    for (var i = 0; i < 12; i++){
      var month = 0
      var nextM = 0
      var year = 0

      var tempIncomeTotal = 0
      var tempExpenseTotal = 0
      var tempSum = 0

      if (i < 11){
        month = i
        nextM = i + 1
        year = this.optYear
      }
      else{
        month = i
        nextM = (i+1)%12
        year = parseInt(this.optYear) + 1
      }

      var thisMonth = new Date(year, month, 1).toISOString()
      var nextMonth = new Date(year, nextM, 1).toISOString()

      var j
      for (j = 0; j < this.user.income.length; j++){
        if (this.user.income[j].date >= thisMonth && this.user.income[j].date < nextMonth){
          tempIncomeTotal = tempIncomeTotal + this.user.income[j].cost
        }
      }
      for (j = 0; j < this.user.expense.length; j++){
        if (this.user.expense[j].date >= thisMonth && this.user.expense[j].date < nextMonth){
          tempExpenseTotal = tempExpenseTotal + this.user.expense[j].cost
        }
      }
      tempSum = tempIncomeTotal - tempExpenseTotal

      if (tempIncomeTotal > 0 || tempExpenseTotal > 0){
        var tempData = []
        tempData.push(monthNames[month])
        tempData.push(tempIncomeTotal)
        tempData.push(tempExpenseTotal)
        tempData.push(tempSum)
        dataSummary.push(tempData)        
      }
    }
    console.log(dataSummary)
    this.totalSummary =  {
      chartType: 'ColumnChart',
      dataTable: dataSummary,
      options: {title: 'Yearly Summary', width: '50%', height: 500, chartArea:{width: '70%', height: '90%'}}
    };

  }

}
