/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SmartphoneTelephoneRecentsCardComponent } from './smartphone-telephone-recents-card.component';

describe('SmartphoneTelephoneRecentsCardComponent', () => {
  let component: SmartphoneTelephoneRecentsCardComponent;
  let fixture: ComponentFixture<SmartphoneTelephoneRecentsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartphoneTelephoneRecentsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartphoneTelephoneRecentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
