import { Component, OnInit, Input } from '@angular/core';
import { CharacterLook } from 'src/app/_models/characterLook';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-character-creator-shirt',
  templateUrl: './character-creator-shirt.component.html',
  styleUrls: ['./character-creator-shirt.component.css']
})
export class CharacterCreatorShirtComponent implements OnInit {

  @Input() characterLook: CharacterLook;
  @Input() variationList?: any[];

  constructor(private altvService: AltvService) {
    altvService.emit('cef:characterCreatorGetComponentsVariation', 8, 11);
   }

  ngOnInit() {
  }

  public get undershirtId() {
    return this.variationList.filter(x => x.component === 8).length - 1;
  }

  public get undershirtTexture() {
    return this.variationList.filter(x => x.component === 8)[this.characterLook.undershirtId].variation;
  }

  public get topId() {
    return this.variationList.filter(x => x.component === 11).length - 1;
  }

  public get topTexture() {
    return this.variationList.filter(x => x.component === 11)[this.characterLook.topId].variation;
  }

}
