/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SmartphoneTelephoneContactsCardComponent } from './smartphone-telephone-contacts-card.component';

describe('SmartphoneTelephoneContactsCardComponent', () => {
  let component: SmartphoneTelephoneContactsCardComponent;
  let fixture: ComponentFixture<SmartphoneTelephoneContactsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartphoneTelephoneContactsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartphoneTelephoneContactsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
