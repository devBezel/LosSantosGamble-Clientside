import { Component, OnInit, Input } from '@angular/core';
import { AltvService } from 'src/app/_services/altv.service';
import { CharacterLook } from 'src/app/_models/characterLook';

@Component({
  selector: 'app-character-creator-torso',
  templateUrl: './character-creator-torso.component.html',
  styleUrls: ['./character-creator-torso.component.css']
})
export class CharacterCreatorTorsoComponent implements OnInit {

  @Input() characterLook: CharacterLook;
  @Input() variationList?: any[];

  constructor(private altvService: AltvService) {
    altvService.emit('cef:characterCreatorGetComponentsVariation', 3);
  }

  ngOnInit() {
  }

  public get torsoId() {
    return this.variationList.filter(x => x.component === 3).length - 1;
  }

  public get torsoTexture() {
    return this.variationList.filter(x => x.component === 3)[this.characterLook.torsoId].variation;
  }

}
