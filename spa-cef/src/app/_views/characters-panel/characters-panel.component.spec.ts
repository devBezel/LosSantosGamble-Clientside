/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CharactersPanelComponent } from './characters-panel.component';

describe('CharactersPanelComponent', () => {
  let component: CharactersPanelComponent;
  let fixture: ComponentFixture<CharactersPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharactersPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
