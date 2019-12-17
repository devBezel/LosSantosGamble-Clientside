import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CharacterHair } from 'src/app/_models/characterHair';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'app-character-creator-hair',
  templateUrl: './character-creator-hair.component.html',
  styleUrls: ['./character-creator-hair.component.css']
})
export class CharacterCreatorHairComponent implements OnInit {

  @Output() selectedHair = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  changeHair(event: MatSliderChange) {
    this.selectedHair.emit(event.value);
  }


}
