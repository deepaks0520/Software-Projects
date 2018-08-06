import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from "@angular/router";
import {AuthService} from "../services/auth.service"
import {FlashMessagesService} from "angular2-flash-messages"
import {ValidateService} from "../services/validate.service"

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private flashMessagesService: FlashMessagesService, private validateService: ValidateService, private router: Router, private authService: AuthService, private route: ActivatedRoute) { }
  
   JWT: any
   user: any
   show: boolean

   viewOption = "Both"
   option = ["Both", "Income", "Expense"]

   expenseNameOption = "None"
   expenseCostOption = "None"
   expenseCategoryOption = "None"   
   expenseDateOption = "None"

   incomeNameOption = "None"
   incomeCostOption = "None"
   incomeCategoryOption = "None"   
   incomeDateOption = "None"

   stringOptions = ["Alphabetically", "Reverse"]
   dateOptions = ["Newest", "Oldest"]
   costOptions = ["Most Expensive", "Least Expensive"]

  ngOnInit() {

    const  temp = this.route.parent.params.subscribe(res => {
      this.JWT = res['JWT'];
      console.log('table')
      this.displayingInfo();
    });
  }

  displayingInfo(){
      this.authService.displayInfo(this.JWT).subscribe(val =>{
        console.log('storing profile information')
        console.log(val.user)
        this.user = val.user;
        var i
        for (i = 0; i < this.user.expense.length; i++){         
          var newDate = new Date(this.user.expense[i].date)
          if ((newDate.getMonth() + 1) < 10 && newDate.getDate() < 10){
            this.user.expense[i].date = "0" + (newDate.getMonth()+1) + '/0' +newDate.getDate() + '/' + newDate.getFullYear()
          }
          else if ((newDate.getMonth() + 1) < 10){
            this.user.expense[i].date = "0" + (newDate.getMonth()+1) + '/' +newDate.getDate() + '/' + newDate.getFullYear() 
          }
          else if ((newDate.getDate()) < 10){
            this.user.expense[i].date = (newDate.getMonth()+1) + '/0' +newDate.getDate() + '/' + newDate.getFullYear() 
          }
          else {
            this.user.expense[i].date = (newDate.getMonth()+1) + '/' +newDate.getDate() + '/' + newDate.getFullYear()
          }
          this.user.expense[i].needUpdate = false;
          this.user.expense[i].categoryUpdate = this.user.expense[i].category
          this.user.expense[i].dateUpdate = this.user.expense[i].date
          this.user.expense[i].nameUpdate = this.user.expense[i].name
          this.user.expense[i].costUpdate = this.user.expense[i].cost
        }

        for (i = 0; i < this.user.income.length; i++){
          var newDate = new Date(this.user.income[i].date)
          if ((newDate.getMonth() + 1) < 10 && newDate.getDate() < 10){
            this.user.income[i].date = "0" + (newDate.getMonth()+1) + '/0' +newDate.getDate() + '/' + newDate.getFullYear()
          }
          else if ((newDate.getMonth() + 1) < 10){
            this.user.income[i].date = "0" + (newDate.getMonth()+1) + '/' +newDate.getDate() + '/' + newDate.getFullYear() 
          }
          else if ((newDate.getDate()) < 10){
            this.user.income[i].date = (newDate.getMonth()+1) + '/0' +newDate.getDate() + '/' + newDate.getFullYear() 
          }
          else {
            this.user.income[i].date = (newDate.getMonth()+1) + '/' +newDate.getDate() + '/' + newDate.getFullYear()
          }
          
          this.user.income[i].needUpdate = false;
          this.user.income[i].categoryUpdate = this.user.income[i].category
          this.user.income[i].dateUpdate = this.user.income[i].date
          this.user.income[i].nameUpdate = this.user.income[i].name
          this.user.income[i].costUpdate = this.user.income[i].cost
      }
    
      console.log(this.user)   
      this.allSort()    
      this.show = true;        
      });
  }

  removeExpense(id){
    const expenseObject = {
      id: this.user._id,
      //change this to be dynamic  
      expenseID: id
    }

    console.log(expenseObject)

    this.authService.removeExpense(this.JWT, expenseObject).subscribe(res => {
      console.log('removing new expense')
      this.displayingInfo()
    })
  }

  removeIncome(id){
    const incomeObject = {
      id: this.user._id,
      //change this to be dynamic  
      incomeID: id
    }

    console.log(incomeObject)

    this.authService.removeIncome(this.JWT, incomeObject).subscribe(res => {
      console.log('removing new income')
      this.displayingInfo()
    })
  }

  editExpense(expenseObj){
    console.log(expenseObj)

    if (!this.validateService.validateAddingIncomeExpense(expenseObj.nameUpdate, expenseObj.categoryUpdate, expenseObj.dateUpdate, expenseObj.costUpdate)){
      this.flashMessagesService.show("Not complete. Please fill in all fields", {cssClass: 'alert-danger', timeout: '3000'});
      return false;      
    }

    if(!this.validateService.validateCost(expenseObj.costUpdate)){
      this.flashMessagesService.show("Enter a valid cost", {cssClass: 'alert-danger', timeout: '3000'});
      return false;
    }

    if (!this.validateService.validateDate(expenseObj.dateUpdate)){
      this.flashMessagesService.show("Enter the date in correct format (mm/dd/yyyy)", {cssClass: 'alert-danger', timeout: '3000'});
      return false;
    }

    var newDate = expenseObj.dateUpdate.split("/")

    const expenseObject = {
      id: this.user._id,
      _id: expenseObj._id,
      name: expenseObj.nameUpdate,
      date: new Date(parseInt(newDate[2]), parseInt(newDate[0]) - 1, parseInt(newDate[1])).toISOString(),
      category: expenseObj.categoryUpdate,
      cost: expenseObj.costUpdate
    }

    console.log(expenseObject)

    this.authService.editExpense(this.JWT, expenseObject).subscribe(res => {
      console.log('editing expense')
      this.displayingInfo()
      expenseObj.needUpdate = false;
    })
  }

  editIncome(incomeObj){
    console.log(incomeObj)

    if (!this.validateService.validateAddingIncomeExpense(incomeObj.nameUpdate, incomeObj.categoryUpdate, incomeObj.dateUpdate, incomeObj.costUpdate)){
      this.flashMessagesService.show("Not complete. Please fill in all fields", {cssClass: 'alert-danger', timeout: '3000'});
      return false;      
    }

    if(!this.validateService.validateCost(incomeObj.costUpdate)){
      this.flashMessagesService.show("Enter a valid cost", {cssClass: 'alert-danger', timeout: '3000'});
      return false;
    }

    if (!this.validateService.validateDate(incomeObj.dateUpdate)){
      this.flashMessagesService.show("Enter the date in correct format (mm/dd/yyyy)", {cssClass: 'alert-danger', timeout: '3000'});
      return false;
    }

    var newDate = incomeObj.dateUpdate.split("/")
    
    const incomeObject = {
      id: this.user._id,
      _id: incomeObj._id,
      name: incomeObj.nameUpdate,
      date: new Date(parseInt(newDate[2]), parseInt(newDate[0]) - 1, parseInt(newDate[1])).toISOString(),
      category: incomeObj.categoryUpdate,
      cost: incomeObj.costUpdate
    }

    console.log(incomeObject)

    this.authService.editIncome(this.JWT, incomeObject).subscribe(res => {
      console.log('editing income')
      this.displayingInfo()
      incomeObj.needUpdate = false;
      
    })
  }

  cancelChanges(object){
    console.log(object)
    this.displayingInfo()
    object.needUpdate = false;
  }

  incomeCostChanged(){
    this.incomeNameOption = "None"
    this.incomeCategoryOption = "None"
    this.incomeDateOption = "None"
    this.allSort()
  }

  incomeNameChanged(){
    this.incomeCostOption = "None"
    this.incomeCategoryOption = "None"
    this.incomeDateOption = "None"
    this.allSort()    
  }

  incomeDateChanged(){
    this.incomeCostOption = "None"
    this.incomeCategoryOption = "None"
    this.incomeNameOption = "None"
    this.allSort()    
  }

  incomeCategoryChanged(){
    this.incomeCostOption = "None"
    this.incomeNameOption = "None"
    this.incomeDateOption = "None"
    this.allSort()    
  }

  expenseCostChanged(){
    this.expenseNameOption = "None"
    this.expenseCategoryOption = "None"
    this.expenseDateOption = "None"
    this.allSort()
  }

  expenseNameChanged(){
    this.expenseCostOption = "None"
    this.expenseCategoryOption = "None"
    this.expenseDateOption = "None"
    this.allSort()    
  }

  expenseDateChanged(){
    this.expenseCostOption = "None"
    this.expenseCategoryOption = "None"
    this.expenseNameOption = "None"
    this.allSort()    
  }

  expenseCategoryChanged(){
    this.expenseCostOption = "None"
    this.expenseNameOption = "None"
    this.expenseDateOption = "None"
    this.allSort()    
  }

  allSort(){
    console.log(this.incomeCostOption)
    console.log(this.incomeCategoryOption)
    console.log(this.expenseDateOption)
    console.log(this.incomeNameOption)

    if (this.incomeNameOption == "Alphabetically"){
      this.sortNameIncomeA()      
    }
    else if (this.incomeNameOption == "Reverse"){
      this.sortNameIncomeR()      
    }
    else if (this.incomeCostOption == "Most Expensive"){
      this.sortCostIncomeL()      
    }
    else if (this.incomeCostOption == "Least Expensive"){
      this.sortCostIncomeG()      
    }
    else if (this.incomeCategoryOption == "Alphabetically"){
      this.sortCategoriesIncomeA()      
    }
    else if (this.incomeCategoryOption == "Reverse"){
      this.sortCategoriesIncomeR()      
    }
    else if (this.incomeDateOption == "Newest"){
      this.sortDateIncomeN()      
    }
    else if (this.incomeDateOption == "Oldest"){
      this.sortDateIncomeO()      
    }

    if (this.expenseNameOption == "Alphabetically"){
      this.sortNameExpenseA()
    }
    else if (this.expenseNameOption == "Reverse"){
      this.sortNameExpenseR()
    }
    else if (this.expenseCostOption == "Most Expensive"){
      this.sortCostExpenseL()
    }
    else if (this.expenseCostOption == "Least Expensive"){
      this.sortCostExpenseG()
    }
    else if (this.expenseCategoryOption == "Alphabetically"){
      this.sortCategoriesExpenseA()
    }
    else if (this.expenseCategoryOption == "Reverse"){
      this.sortCategoriesExpenseR()
    }
    else if (this.expenseDateOption == "Newest"){
      this.sortDateExpenseN()
    }
    else if (this.expenseDateOption == "Oldest"){
      this.sortDateExpenseO()
    }
  }

  sortCostIncomeG(){
    console.log(this.user.income)
    this.user.income.sort(function(a,b){return a.cost - b.cost})
  }

  sortCostExpenseG(){
    console.log(this.user.expense)
    this.user.expense.sort(function(a,b){return a.cost - b.cost})
  }

  sortCostIncomeL(){
    console.log(this.user.income)
    this.user.income.sort(function(a,b){return b.cost - a.cost})
  }

  sortCostExpenseL(){
    console.log(this.user.expense)
    this.user.expense.sort(function(a,b){return b.cost - a.cost})
  }

  sortNameIncomeA(){
    console.log(this.user.income)
    this.user.income.sort(function(a,b){
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    })
  }

  sortNameExpenseA(){
    console.log(this.user.expense)
    this.user.expense.sort(function(a,b){
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    })
  }

  sortNameIncomeR(){
    console.log(this.user.income)
    this.user.income.sort(function(a,b){
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      if (x > y) {return -1;}
      if (x < y) {return 1;}
      return 0;
    })
  }

  sortNameExpenseR(){
    console.log(this.user.expense)
    this.user.expense.sort(function(a,b){
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      if (x > y) {return -1;}
      if (x < y) {return 1;}
      return 0;
    })
  }

  sortCategoriesIncomeA(){
    console.log(this.user.income)
    this.user.income.sort(function(a,b){
      var x = a.category.toLowerCase();
      var y = b.category.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    })
  }

  sortCategoriesExpenseA(){
    console.log(this.user.expense)
    this.user.expense.sort(function(a,b){
      var x = a.category.toLowerCase();
      var y = b.category.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    })
  }

  sortCategoriesIncomeR(){
    console.log(this.user.income)
    this.user.income.sort(function(a,b){
      var x = a.category.toLowerCase();
      var y = b.category.toLowerCase();
      if (x > y) {return -1;}
      if (x < y) {return 1;}
      return 0;
    })
  }

  sortCategoriesExpenseR(){
    console.log(this.user.expense)
    this.user.expense.sort(function(a,b){
      var x = a.category.toLowerCase();
      var y = b.category.toLowerCase();
      if (x > y) {return -1;}
      if (x < y) {return 1;}
      return 0;
    })
  }

  sortDateIncomeO(){
    console.log(this.user.income)
    
    this.user.income.sort(function(a,b){
      var newDateA = a.date.split("/")
      var newDateB = b.date.split("/")

      var dateA = new Date(parseInt(newDateA[2]), parseInt(newDateA[0]) - 1, parseInt(newDateA[1])).toISOString()
      var dateB = new Date(parseInt(newDateB[2]), parseInt(newDateB[0]) - 1, parseInt(newDateB[1])).toISOString()
      
      if (dateA < dateB) {return -1;}
      if (dateA > dateB) {return 1;}
      return 0;
    })
  }

  sortDateExpenseO(){
    console.log(this.user.expense)
    
    this.user.expense.sort(function(a,b){
      var newDateA = a.date.split("/")
      var newDateB = b.date.split("/")

      var dateA = new Date(parseInt(newDateA[2]), parseInt(newDateA[0]) - 1, parseInt(newDateA[1])).toISOString()
      var dateB = new Date(parseInt(newDateB[2]), parseInt(newDateB[0]) - 1, parseInt(newDateB[1])).toISOString()
      
      if (dateA < dateB) {return -1;}
      if (dateA > dateB) {return 1;}
      return 0;
    })
  }

  sortDateIncomeN(){
    console.log(this.user.income)
    
    this.user.income.sort(function(a,b){
      var newDateA = a.date.split("/")
      var newDateB = b.date.split("/")

      var dateA = new Date(parseInt(newDateA[2]), parseInt(newDateA[0]) - 1, parseInt(newDateA[1])).toISOString()
      var dateB = new Date(parseInt(newDateB[2]), parseInt(newDateB[0]) - 1, parseInt(newDateB[1])).toISOString()
      
      if (dateA > dateB) {return -1;}
      if (dateA < dateB) {return 1;}
      return 0;
    })
  }

  sortDateExpenseN(){
    console.log(this.user.expense)
    
    this.user.expense.sort(function(a,b){
      var newDateA = a.date.split("/")
      var newDateB = b.date.split("/")

      var dateA = new Date(parseInt(newDateA[2]), parseInt(newDateA[0]) - 1, parseInt(newDateA[1])).toISOString()
      var dateB = new Date(parseInt(newDateB[2]), parseInt(newDateB[0]) - 1, parseInt(newDateB[1])).toISOString()
      
      if (dateA > dateB) {return -1;}
      if (dateA < dateB) {return 1;}
      return 0;
    })
  }
}
