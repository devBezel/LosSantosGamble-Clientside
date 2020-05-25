/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SmartphoneTelephoneNumberCardComponent } from './smartphone-telephone-number-card.component';

describe('SmartphoneTelephoneNumberCardComponent', () => {
  let component: SmartphoneTelephoneNumberCardComponent;
  let fixture: ComponentFixture<SmartphoneTelephoneNumberCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartphoneTelephoneNumberCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartphoneTelephoneNumberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
