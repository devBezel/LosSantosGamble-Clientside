/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SmartphoneTelephoneContactDetailComponent } from './smartphone-telephone-contact-detail.component';

describe('SmartphoneTelephoneContactDetailComponent', () => {
  let component: SmartphoneTelephoneContactDetailComponent;
  let fixture: ComponentFixture<SmartphoneTelephoneContactDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartphoneTelephoneContactDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartphoneTelephoneContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
