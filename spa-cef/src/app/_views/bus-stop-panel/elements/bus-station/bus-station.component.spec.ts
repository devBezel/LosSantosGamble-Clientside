/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BusStationComponent } from './bus-station.component';

describe('BusStationComponent', () => {
  let component: BusStationComponent;
  let fixture: ComponentFixture<BusStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
