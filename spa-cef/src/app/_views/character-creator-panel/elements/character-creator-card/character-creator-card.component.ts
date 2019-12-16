import { Component, OnInit, Input } from '@angular/core';
import { ColorPalette } from 'src/app/_models/colorPalette';

@Component({
  selector: 'app-character-creator-card',
  templateUrl: './character-creator-card.component.html',
  styleUrls: ['./character-creator-card.component.css']
})
export class CharacterCreatorCardComponent implements OnInit {

  @Input() body: number;


  constructor() { }

  ngOnInit() {
  }

}
