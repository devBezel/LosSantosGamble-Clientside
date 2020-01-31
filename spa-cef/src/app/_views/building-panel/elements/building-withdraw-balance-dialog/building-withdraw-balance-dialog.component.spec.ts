/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BuildingWithdrawBalanceDialogComponent } from './building-withdraw-balance-dialog.component';

describe('BuildingWithdrawBalanceDialogComponent', () => {
  let component: BuildingWithdrawBalanceDialogComponent;
  let fixture: ComponentFixture<BuildingWithdrawBalanceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingWithdrawBalanceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingWithdrawBalanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
