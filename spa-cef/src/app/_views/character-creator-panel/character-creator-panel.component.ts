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
  variationList: any[];

  constructor(private altvService: AltvService, private route: ActivatedRoute, private characterService: CharacterService) {
    // altvService.on('characterCreator:clothesVariation', this.getComponentVariation);
    this.getComponentVariation();

    setInterval(() => {
      // console.log(`${this.characterLook.legsId}  ${this.characterLook.legsTexture}`);
      altvService.emit('cef:characterCreatorUpdateClothes', this.characterLook);
    }, 200);


  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.characterLook = data.characterLook;
    });
  }

  getComponentVariation() {
    this.altvService.on('characterCreator:clothesVariation', async (listVariation: any[]) => {
      // console.log(listVariation);
      this.variationList = listVariation;

    });
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
