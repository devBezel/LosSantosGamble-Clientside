import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatSliderChange } from '@angular/material';
import { CharacterLook } from 'src/app/_models/characterLook';

@Component({
  selector: 'app-character-creator-hair',
  templateUrl: './character-creator-hair.component.html',
  styleUrls: ['./character-creator-hair.component.css']
})
export class CharacterCreatorHairComponent implements OnInit {

  @Input() characterLook: CharacterLook;
  constructor() { }

  ngOnInit() {
  }


}
