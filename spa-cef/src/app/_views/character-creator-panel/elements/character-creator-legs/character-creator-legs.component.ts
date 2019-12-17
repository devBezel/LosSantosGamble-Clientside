import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-creator-legs',
  templateUrl: './character-creator-legs.component.html',
  styleUrls: ['./character-creator-legs.component.css']
})
export class CharacterCreatorLegsComponent implements OnInit {

  constructor() { }

  startClothes: any[] = [
    {
      clotheId: 0,
      min: 0,
      max: 15,
      cost: 10
    },
    {
      clotheId: 1,
      min: 0,
      max: 15,
      cost: 10
    },
    {
      clotheId: 0,
      min: 0,
      max: 15,
      cost: 10
    },
  ];

  ngOnInit() {
  }

}
