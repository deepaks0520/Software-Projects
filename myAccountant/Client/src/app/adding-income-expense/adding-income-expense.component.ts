import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from "@angular/router";
import {AuthService} from "../services/auth.service"
import {FlashMessagesService} from "angular2-flash-messages"
import {ValidateService} from "../services/validate.service"

@Component({
  selector: 'app-adding-income-expense',
  templateUrl: './adding-income-expense.component.html',
  styleUrls: ['./adding-income-expense.component.css']
})
export class AddingIncomeExpenseComponent implements OnInit {

  constructor(private router: Router, private validateService: ValidateService, private flashMessagesService: FlashMessagesService, private authService: AuthService, private route: ActivatedRoute) { }
  
  JWT: any
  user: any
  expenseName: String
  expenseCost: number
  expenseCategory: String
  expenseDate: String
 
  incomeName: String
  incomeCost: number
  incomeCategory: String
  incomeDate: String

  ngOnInit() {

    const  temp = this.route.parent.params.subscribe(res => {
      this.JWT = res['JWT'];
      console.log('adding income or expense')
      this.displayingInfo()    
    });
  }

  displayingInfo(){
    this.authService.displayInfo(this.JWT).subscribe(val =>{
      console.log('storing profile information')
      console.log(val.user)
      this.user = val.user;
    });
  }

  addExpense(){
    if (!this.validateService.validateAddingIncomeExpense(this.expenseName, this.expenseCost, this.expenseDate, this.expenseCategory)){
      this.flashMessagesService.show("Not complete. Please fill in all fields", {cssClass: 'alert-danger', timeout: '3000'});
      return false;      
    }

    if(!this.validateService.validateCost(this.expenseCost)){
      this.flashMessagesService.show("Enter a valid cost", {cssClass: 'alert-danger', timeout: '3000'});
      return false;
    }

    if (!this.validateService.validateDate(this.expenseDate)){
      this.flashMessagesService.show("Enter the date in correct format (mm/dd/yyyy)", {cssClass: 'alert-danger', timeout: '3000'});
      return false;
    }

    var newDate = this.expenseDate.split("/")

    var expenseObject = {
      id: this.user._id,
      name: this.expenseName,
      cost: this.expenseCost,
      date: new Date(parseInt(newDate[2]), parseInt(newDate[0]) - 1, parseInt(newDate[1])).toISOString(),
      category: this.expenseCategory
    }

    console.log(expenseObject)
    
  
    this.authService.addExpense(this.JWT, expenseObject).subscribe(res => {
      console.log('adding new expense')
      this.displayingInfo()
      this.expenseName = null
      this.expenseCost = null
      this.expenseDate = null
      this.expenseCategory = null
    }) 
    
  }

  addIncome(){
    if (!this.validateService.validateAddingIncomeExpense(this.incomeName, this.incomeCost, this.incomeDate, this.incomeCategory)){
      this.flashMessagesService.show("Not complete. Please fill in all fields", {cssClass: 'alert-danger', timeout: '3000'});
      return false;      
    }

    if(!this.validateService.validateCost(this.incomeCost)){
      this.flashMessagesService.show("Enter a valid cost", {cssClass: 'alert-danger', timeout: '3000'});
      return false;
    }

    if (!this.validateService.validateDate(this.incomeDate)){
      this.flashMessagesService.show("Enter the date in correct format (mm/dd/yyyy)", {cssClass: 'alert-danger', timeout: '3000'});
      return false;
    }

    var newDate = this.incomeDate.split("/")

    const incomeObject = {
      id: this.user._id,
      name: this.incomeName,
      cost: this.incomeCost,
      date: new Date(parseInt(newDate[2]), parseInt(newDate[0]) - 1, parseInt(newDate[1])).toISOString(),
      category: this.incomeCategory
    }

    console.log(incomeObject)

    this.authService.addIncome(this.JWT, incomeObject).subscribe(res => {
      console.log('adding new income')
      this.displayingInfo()
      this.incomeName = null
      this.incomeCost = null
      this.incomeDate = null
      this.incomeCategory = null
    }) 
  }
}
