import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user){
    console.log('making post request to register user')
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/users/signUp', user, {headers: headers}).pipe(
    map((res=>res.json()))
    );
  }

  signIn(user){
    console.log('making post request to sign in a user')
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/users/signIn', user, {headers: headers}).pipe(
      map((res=>res.json()))
    );
  }

  displayInfo(JWT){
    console.log('making a get request to find user information')
    let headers = new Headers();
    headers.append('Authorization', JWT)
    return this.http.get('http://localhost:4000/users/profile', {headers: headers}).pipe(
      map(res => res.json())
    );
  }

  deleteUser(JWT, user){
    console.log('making post request to deleteUser')
    let headers = new Headers();
    headers.append('Authorization', JWT)
    return this.http.post('http://localhost:4000/users/deleteUser', user, {headers: headers}).pipe(
      map(res => res.json())
    );
  }

  addExpense(JWT, expenseObject){
    console.log('making post request to add an expense to the user')
    let headers = new Headers();
    headers.append('Authorization', JWT)
    return this.http.post('http://localhost:4000/users/addExpense', expenseObject, {headers: headers}).pipe(
      map(res=>res.json())
    )
  }

  editExpense(JWT, expenseObject){
    console.log('making post request to edit an expense to the user')
    let headers = new Headers();
    headers.append('Authorization', JWT)
    return this.http.post('http://localhost:4000/users/editExpense', expenseObject, {headers: headers}).pipe(
      map(res=>res.json())
    )
  }

  removeExpense(JWT, expenseObject){
    console.log('making post request to remove an expense of the user')
    let headers = new Headers();
    headers.append('Authorization', JWT)
    return this.http.post('http://localhost:4000/users/removeExpense', expenseObject, {headers: headers}).pipe(
      map(res=>res.json())
    )
  }

  addIncome(JWT, incomeObject){
    console.log('making post request to add an income to the user')
    let headers = new Headers();
    headers.append('Authorization', JWT)
    return this.http.post('http://localhost:4000/users/addIncome', incomeObject, {headers: headers}).pipe(
      map(res=>res.json())
    )
  }

  editIncome(JWT, incomeObject){
    console.log('making post request to edit an incometo of the user')
    let headers = new Headers();
    headers.append('Authorization', JWT)
    return this.http.post('http://localhost:4000/users/editIncome', incomeObject, {headers: headers}).pipe(
      map(res=>res.json())
    )
  }

  removeIncome(JWT, incomeObject){
    console.log('making post request to remove an income to the user')
    let headers = new Headers();
    headers.append('Authorization', JWT)
    return this.http.post('http://localhost:4000/users/removeIncome', incomeObject, {headers: headers}).pipe(
      map(res=>res.json())
    )
  }
}
