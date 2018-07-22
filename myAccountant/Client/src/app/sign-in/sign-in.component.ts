import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {ValidateService} from "../services/validate.service"
import {FlashMessagesService} from "angular2-flash-messages"
import {AuthService} from "../services/auth.service"


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String; 

  constructor(private router: Router, private validateService: ValidateService, private flashMessagesService: FlashMessagesService, private authService: AuthService) { }
  
  ngOnInit() {}
  
  signUp(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password

    }

     if (!this.validateService.validateSignUp(user)){
        this.flashMessagesService.show("Not complete. Please fill in all fields", {cssClass: 'alert-danger', timeout: '1000'});
        return false;
     }

     if (!this.validateService.validateEmail(user.email)){
      this.flashMessagesService.show("Please enter a valid email", {cssClass: 'alert-danger', timeout: '1000'});      
       return false;
     }

     this.authService.registerUser(user).subscribe(data => {
        if (data.success){
          this.flashMessagesService.show("You have successfully created an account!", {cssClass: 'alert-success', timeout: '1000'});    
          console.log("redirecting to user profile page")          
          this.router.navigate(['/afterSignInHome', data.token]);              
        }
        else{
          this.flashMessagesService.show("Username or email already exists", {cssClass: 'alert-danger', timeout: '1000'});    
        }
     })     
  }

  back(){
    console.log('redirecting to home page')
    this.router.navigate(['home']);
  }
  

}
