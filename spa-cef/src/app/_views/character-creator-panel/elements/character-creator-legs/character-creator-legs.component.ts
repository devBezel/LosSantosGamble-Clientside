import { Component, OnInit, Input } from '@angular/core';
import { CharacterLook } from 'src/app/_models/characterLook';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-character-creator-legs',
  templateUrl: './character-creator-legs.component.html',
  styleUrls: ['./character-creator-legs.component.css']
})
export class CharacterCreatorLegsComponent implements OnInit {
  @Input() characterLook: CharacterLook;
  @Input() variationList?: any[];

  constructor(private altvService: AltvService) {
    altvService.emit('cef:characterCreatorGetComponentsVariation', 4, 6);
  }


  ngOnInit() {
  }

  public get legsId() {
    return this.variationList.filter(x => x.component === 4).length - 1;
  }

  public get legsTexture() {
    return this.variationList.filter(x => x.component === 4)[this.characterLook.legsId].variation;
  }

  public get shoesId() {
    return this.variationList.filter(x => x.component === 6).length - 1;
  }

  public get shoesTexture() {
    return this.variationList.filter(x => x.component === 6)[this.characterLook.shoesId].variation;
  }

}
