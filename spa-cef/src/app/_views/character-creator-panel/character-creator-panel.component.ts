import { Component, OnInit } from '@angular/core';
import { AltvService } from 'src/app/_services/altv.service';
import { CharacterService } from 'src/app/_services/character.service';
import { MatSliderChange } from '@angular/material';
import { Character } from 'src/app/_models/character';
import { ActivatedRoute } from '@angular/router';
import { CharacterLook } from 'src/app/_models/characterLook';

@Component({
  selector: 'app-character-creator-panel',
  templateUrl: './character-creator-panel.component.html',
  styleUrls: ['./character-creator-panel.component.css']
})
export class CharacterCreatorPanelComponent implements OnInit {

  selectedBody: number;
  characterLook: CharacterLook;

  constructor(private altvService: AltvService, private route: ActivatedRoute) {
    setInterval(() => {
      altvService.emit('cef:characterCreatorUpdateClothes', this.characterLook);
    }, 200);
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.characterLook = data.characterLook;
    });
  }

  getActuallyClothes(character: Character) {
  }

  randomClothes() {
    this.altvService.emit('cef:characterCreatorRandomClothes');
  }

  clearClothes() {
    this.altvService.emit('cef:characterCreatorClearClothes');
  }

  selectBody(body: number) {
    this.selectedBody = body;
  }

  changeRotation(event: MatSliderChange) {
    this.altvService.emit('cef:characterCreatorChangeRotation', event.value);
  }
}
