import { Component, OnInit, Input } from '@angular/core';
import { CharacterLook } from 'src/app/_models/characterLook';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-character-creator-glasses',
  templateUrl: './character-creator-glasses.component.html',
  styleUrls: ['./character-creator-glasses.component.css']
})
export class CharacterCreatorGlassesComponent implements OnInit {

  @Input() characterLook: CharacterLook;
  @Input() variationList?: any[];

  constructor(private altvService: AltvService) {
    altvService.emit('cef:characterCreatorGetComponentsVariation', 1, null, null, true);
  }

  ngOnInit() {
  }

  public get glassesId() {
    return this.variationList.length - 1;
  }

  public get glassesTexture() {
    return this.variationList[this.characterLook.glassesId].variation;
  }

}
