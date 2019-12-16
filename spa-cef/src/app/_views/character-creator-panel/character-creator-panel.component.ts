import { Component, OnInit } from '@angular/core';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-character-creator-panel',
  templateUrl: './character-creator-panel.component.html',
  styleUrls: ['./character-creator-panel.component.css']
})
export class CharacterCreatorPanelComponent implements OnInit {

  constructor(private altvService: AltvService) { }

  selectedBody: number;

  ngOnInit() {
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
}
