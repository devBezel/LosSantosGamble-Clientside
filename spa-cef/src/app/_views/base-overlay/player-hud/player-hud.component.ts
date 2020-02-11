import { Component, OnInit, Input } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { AltvService } from 'src/app/_services/altv.service';
import { Character } from 'src/app/_models/character';

@Component({
  selector: 'app-player-hud',
  templateUrl: './player-hud.component.html',
  styleUrls: ['./player-hud.component.css']
})
export class PlayerHudComponent implements OnInit {

  @Input() hudInformation: Character;

  constructor(private baseService: BaseService, private altvService: AltvService) { }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.hudInformation.name);
      this.hudInformation = this.baseService.hudInformation;
    }, 2);
  }

}
