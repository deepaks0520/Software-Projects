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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ValidateService} from './services/validate.service';
import {FlashMessagesModule} from 'angular2-flash-messages'; 
import { AuthService} from './services/auth.service';
import { AddingIncomeExpenseComponent } from './adding-income-expense/adding-income-expense.component';

@NgModule({
  declarations: [
    AppComponent,
    AfterSigningInHomeComponent,
    HomeComponent,
    MonthlyChartComponent,
    YearlyChartComponent,
    TableComponent,
    SignInComponent,
    LogInComponent,
    AddingIncomeExpenseComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    HttpModule
  ],
  providers: [ValidateService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
