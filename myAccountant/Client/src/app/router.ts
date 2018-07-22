import { Routes } from '@angular/router';
import { AfterSigningInHomeComponent } from './after-signing-in-home/after-signing-in-home.component';
import { HomeComponent } from './home/home.component';
import { MonthlyChartComponent } from './monthly-chart/monthly-chart.component';
import { YearlyChartComponent } from './yearly-chart/yearly-chart.component';
import { TableComponent } from './table/table.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';
import { AddingIncomeExpenseComponent } from './adding-income-expense/adding-income-expense.component';



export const appRoutes: Routes= [
    { 
        path: '', 
        redirectTo: '/home', 
        pathMatch: 'full' },
    {
        path:'home',
        component: HomeComponent,  
    },
    {
        path: 'signUp',
        component: SignInComponent
    },
    {
        path: 'logIn',
        component: LogInComponent
    },
    {
        path: 'afterSignInHome/:JWT',
        component: AfterSigningInHomeComponent,
        children: [
            {
                path: '',
                pathMatch: 'prefix',
                redirectTo: 'table'
            },
            {
                path: 'addingIncomeExpense',
                component: AddingIncomeExpenseComponent,
            }
            
            {
                path: 'table',
                component: TableComponent,
            },

            {
                path: 'monthlyChart',
                component: MonthlyChartComponent
            },
            {
                path: 'yearlyChart',
                component: YearlyChartComponent
            }
        ]
    }
];