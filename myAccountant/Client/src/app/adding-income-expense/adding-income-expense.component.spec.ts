import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingIncomeExpenseComponent } from './adding-income-expense.component';

describe('AddingIncomeExpenseComponent', () => {
  let component: AddingIncomeExpenseComponent;
  let fixture: ComponentFixture<AddingIncomeExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingIncomeExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingIncomeExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
