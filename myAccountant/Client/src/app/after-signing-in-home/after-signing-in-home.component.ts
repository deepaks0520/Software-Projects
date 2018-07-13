import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-after-signing-in-home',
  templateUrl: './after-signing-in-home.component.html',
  styleUrls: ['./after-signing-in-home.component.css']
})
export class AfterSigningInHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  signOut(){
    console.log("redirecting")
    this.router.navigate(['home']);    
  }

}
