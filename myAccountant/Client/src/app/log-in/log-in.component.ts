import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {ValidateService} from "../services/validate.service"
import {FlashMessagesService} from "angular2-flash-messages"
import {AuthService} from "../services/auth.service"


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  username: String;
  password: String;

  constructor(private router: Router, private validateService: ValidateService, private flashMessagesService: FlashMessagesService, private authService: AuthService) { }
  
  ngOnInit() {
  }

  login(){
    const user = {
      username: this.username,
      password: this.password
    }

    if (!this.validateService.validateSignIn(user)){
      this.flashMessagesService.show("Not complete. Please fill in all fields", {cssClass: 'alert-danger', timeout: '3000'});
      return false;
    }

    this.authService.signIn(user).subscribe(data => {
      console.log(data)
      if (data.success){
        this.flashMessagesService.show("You have successfully signed in!", {cssClass: 'alert-success', timeout: '1000'});    
        console.log("redirecting to personal page")       
        this.router.navigate(['/afterSignInHome', data.token]);              
      }
      else{
        this.flashMessagesService.show("Wrong Password", {cssClass: 'alert-danger', timeout: '1000'});    
        console.log("You entered the wrong passwor")          
      }
   })
  }

  back(){
    console.log('redirecting to home page')
    this.router.navigate(['home']);      
  }
}


