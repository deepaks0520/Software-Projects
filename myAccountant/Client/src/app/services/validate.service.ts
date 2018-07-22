import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateSignIn(user) {
    console.log('checking if all fields are complete for signing in')
    if (user.username == undefined || user.password == undefined){
      return false;
    }
    else{
      return true;
    }
  }

  validateSignUp(user) {
    console.log('checking if all fields are complete for signing up')
    if (user.name == undefined || user.username == undefined || user.email == undefined || user.password == undefined){
      return false;
    }
    else{
      return true;
    }
  }

  validateEmail(email){
    console.log('checking if an email has been provided')
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateAddingIncomeExpense(name, cost, date, category){
    console.log('checking if all fields are filled')
    if (name == undefined || cost == undefined || date == undefined || category == undefined){
      return false;
    }
    return true;
  }


  validateCost(cost){
    console.log('checking if the cost is a number')
    if (isNaN(2*cost)){
      console.log('not a number')
      return false;
    }
    return true;
  }

  validateDate(date){
    console.log('checking if the date has been provided in the correct format')
    if(date.length != 10){
      console.log('error in length of date')
      return false;
    }

    if (date[2] != '/' || date[5] != '/'){
      console.log("error in /")
      return false;
    }
    
    if (parseInt(date[0]) < 0 || parseInt(date[0]) > 1 || parseInt(date[1]) < 0 || parseInt(date[1]) > 10 || (10*parseInt(date[0]) + parseInt(date[1])) > 12){
      console.log("error in month")
      return false;
    }
    
    if (parseInt(date[3]) < 0 || parseInt(date[3]) > 3 || parseInt(date[4]) < 0 || parseInt(date[4]) > 10 || (10*parseInt(date[3]) + parseInt(date[4])) > 31){
      console.log("error in day")
      return false;
    }

    if (parseInt(date[6]) < 0 || parseInt(date[6]) > 10 || parseInt(date[7]) < 0 || parseInt(date[7]) > 10 || parseInt(date[8]) < 0 || parseInt(date[8]) > 10 || parseInt(date[9]) < 0 || parseInt(date[9]) > 10){
      console.log("year")
      return false;
    }

    return true;
  }
}
