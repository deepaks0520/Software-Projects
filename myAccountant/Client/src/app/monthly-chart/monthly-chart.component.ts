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

 ngOnInit() {
    const  temp = this.route.parent.params.subscribe(res => {
      this.JWT = res['JWT'];
      console.log('month')
  });
}

}
