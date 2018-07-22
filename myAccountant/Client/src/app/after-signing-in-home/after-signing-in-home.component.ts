import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from "@angular/router";
import {AuthService} from "../services/auth.service"

@Component({
  selector: 'app-after-signing-in-home',
  templateUrl: './after-signing-in-home.component.html',
  styleUrls: ['./after-signing-in-home.component.css']
})
export class AfterSigningInHomeComponent implements OnInit {

 JWT: String
 user: any 

 constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {   
    const JWT = this.route.params.subscribe(res => {    
      this.JWT = res['JWT'];
      console.log('after signing in')
      console.log('redirecting to table')
    });    
  }

  deleteAccount(){
    this.authService.deleteUser(this.JWT, this.user).subscribe(val => {
    console.log('redirecting to home page')
    this.router.navigate(['home']);      
    })  
  }

  signOut(){
    console.log("redirecting to home page")
    this.router.navigate(['home']);    
  }

}
