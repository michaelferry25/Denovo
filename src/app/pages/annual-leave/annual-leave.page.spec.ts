import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnnualLeavePage } from './annual-leave.page';

describe('AnnualLeavePage', () => {
  let component: AnnualLeavePage;
  let fixture: ComponentFixture<AnnualLeavePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualLeavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
