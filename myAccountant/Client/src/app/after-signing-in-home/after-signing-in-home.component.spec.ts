import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterSigningInHomeComponent } from './after-signing-in-home.component';

describe('AfterSigningInHomeComponent', () => {
  let component: AfterSigningInHomeComponent;
  let fixture: ComponentFixture<AfterSigningInHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterSigningInHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterSigningInHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
