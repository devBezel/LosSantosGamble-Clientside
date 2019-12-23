import { Component, OnInit, Input } from '@angular/core';
import { CharacterLook } from 'src/app/_models/characterLook';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-character-creator-hat',
  templateUrl: './character-creator-hat.component.html',
  styleUrls: ['./character-creator-hat.component.css']
})
export class CharacterCreatorHatComponent implements OnInit {

  @Input() characterLook: CharacterLook;
  @Input() variationList?: any[];

  constructor(private altvService: AltvService) {
    altvService.emit('cef:characterCreatorGetComponentsVariation', 0, null, null, true);
   }

  ngOnInit() {
  }

  public get hatId() {
    return this.variationList.length - 1;
  }

  public get hatTexture() {
    return this.variationList[this.characterLook.hatId].variation - 1;
  }

}
