/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BuildingPlayersOnlineDialogComponent } from './building-players-online-dialog.component';

describe('BuildingPlayersOnlineDialogComponent', () => {
  let component: BuildingPlayersOnlineDialogComponent;
  let fixture: ComponentFixture<BuildingPlayersOnlineDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingPlayersOnlineDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingPlayersOnlineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
