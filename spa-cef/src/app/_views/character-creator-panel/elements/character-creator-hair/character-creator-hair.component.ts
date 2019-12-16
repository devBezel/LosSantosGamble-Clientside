import { Component, OnInit } from '@angular/core';
import { CharacterHair } from 'src/app/_models/characterHair';

@Component({
  selector: 'app-character-creator-hair',
  templateUrl: './character-creator-hair.component.html',
  styleUrls: ['./character-creator-hair.component.css']
})
export class CharacterCreatorHairComponent implements OnInit {

  characterHair: CharacterHair = new CharacterHair();
  constructor() { }

  ngOnInit() {
  }

  check() {
    console.log(this.characterHair.hairId);
  }

}
