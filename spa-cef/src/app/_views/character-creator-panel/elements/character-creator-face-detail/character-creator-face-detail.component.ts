import { Component, OnInit, Input } from '@angular/core';
import { CharacterLook } from 'src/app/_models/characterLook';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-character-creator-face-detail',
  templateUrl: './character-creator-face-detail.component.html',
  styleUrls: ['./character-creator-face-detail.component.css']
})
export class CharacterCreatorFaceDetailComponent implements OnInit {

  @Input() characterLook: CharacterLook;
  @Input() variationList?: any[];

  constructor() { }

  ngOnInit() {
  }

}
