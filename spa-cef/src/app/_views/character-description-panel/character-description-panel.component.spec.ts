/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CharacterDescriptionPanelComponent } from './character-description-panel.component';

describe('CharacterDescriptionPanelComponent', () => {
  let component: CharacterDescriptionPanelComponent;
  let fixture: ComponentFixture<CharacterDescriptionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterDescriptionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDescriptionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
