import { Component, OnInit } from '@angular/core';
import { AltvService } from 'src/app/_services/altv.service';
import { BaseService } from 'src/app/_services/base.service';
import { Character } from 'src/app/_models/character';

@Component({
  selector: 'app-base-overlay',
  templateUrl: './base-overlay.component.html',
  styleUrls: ['./base-overlay.component.css']
})
export class BaseOverlayComponent implements OnInit {

  hudInformation: Character;
  constructor(private baseService: BaseService) { }

  ngOnInit() {
    this.hudInformation = this.baseService.hudInformation;
  }

}
