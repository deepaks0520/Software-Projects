import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyChartComponent } from './monthly-chart.component';

describe('MonthlyChartComponent', () => {
  let component: MonthlyChartComponent;
  let fixture: ComponentFixture<MonthlyChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
