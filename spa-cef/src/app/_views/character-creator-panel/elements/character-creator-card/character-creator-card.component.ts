import { Component, OnInit, Input } from '@angular/core';
import { ColorPalette } from 'src/app/_models/colorPalette';
import { AuthService } from 'src/app/_services/auth.service';
import { AltvService } from 'src/app/_services/altv.service';
import { CharacterLook } from 'src/app/_models/characterLook';

@Component({
  selector: 'app-character-creator-card',
  templateUrl: './character-creator-card.component.html',
  styleUrls: ['./character-creator-card.component.css']
})
export class CharacterCreatorCardComponent implements OnInit {

  @Input() body: number;
  @Input() characterLook: CharacterLook;
  @Input() variationList: any[];

  selectedColor: number;

  constructor(private authService: AuthService, private altvService: AltvService) {

  }

  ngOnInit() {
  }

  selectedColorMode(hairColorId: number) {
    this.selectedColor = hairColorId;

  }

}
