import { Component, OnInit, Input } from '@angular/core';
import { ColorPalette } from 'src/app/_models/colorPalette';
import { CharacterHair } from 'src/app/_models/characterHair';
import { AuthService } from 'src/app/_services/auth.service';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-character-creator-card',
  templateUrl: './character-creator-card.component.html',
  styleUrls: ['./character-creator-card.component.css']
})
export class CharacterCreatorCardComponent implements OnInit {

  @Input() body: number;
  selectedColor: number;
  characterHair: CharacterHair = new CharacterHair();

  constructor(private authService: AuthService, private altvService: AltvService) { }

  ngOnInit() {
  }

  selectedColorMode(hairColorId: number) {
    this.selectedColor = hairColorId;

  }

  selectedHairMode(hairId: number) {
    this.characterHair.characterId = this.authService.getCharacterId();
    this.characterHair.colorId = this.selectedColor;

    if (this.selectedColor === undefined) {
      this.characterHair.colorId = 0;
    }
    this.characterHair.hairId = hairId;

    this.altvService.emit('cef:characterCreatorChangeHair', this.characterHair);
  }

}
