import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AfterSigningInHomeComponent } from './after-signing-in-home/after-signing-in-home.component';
import { RouterModule } from '@angular/router';
import {appRoutes} from './router';
import { HomeComponent } from './home/home.component';
import { MonthlyChartComponent } from './monthly-chart/monthly-chart.component';
import { YearlyChartComponent } from './yearly-chart/yearly-chart.component';
import { TableComponent } from './table/table.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';


@NgModule({
  declarations: [
    AppComponent,
    AfterSigningInHomeComponent,
    HomeComponent,
    MonthlyChartComponent,
    YearlyChartComponent,
    TableComponent,
    SignInComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
