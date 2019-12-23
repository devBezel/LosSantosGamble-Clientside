import { Component, OnInit, Input } from '@angular/core';
import { CharacterLook } from 'src/app/_models/characterLook';

@Component({
  selector: 'app-character-creator-beard',
  templateUrl: './character-creator-beard.component.html',
  styleUrls: ['./character-creator-beard.component.css']
})
export class CharacterCreatorBeardComponent implements OnInit {

  @Input() characterLook: CharacterLook;

  constructor() { }

  ngOnInit() {
  }

}
