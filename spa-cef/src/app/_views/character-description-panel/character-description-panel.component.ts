import { Component, OnInit } from '@angular/core';
import { CharacterDescription } from 'src/app/_models/characterDescription';
import { ActivatedRoute } from '@angular/router';
import { CharacterDescriptionResolver } from 'src/app/_resolvers/character-description.resolver';
import { AuthService } from 'src/app/_services/auth.service';
import { CharacterService } from 'src/app/_services/character.service';
import { AltvService } from 'src/app/_services/altv.service';
import { NotifyService } from 'src/app/_services/notify.service';
import { BaseService } from 'src/app/_services/base.service';

@Component({
  selector: 'app-character-description-panel',
  templateUrl: './character-description-panel.component.html',
  styleUrls: ['./character-description-panel.component.css']
})
export class CharacterDescriptionPanelComponent implements OnInit {

  descriptions: CharacterDescription[];
  newDescription: CharacterDescription = new CharacterDescription();

  constructor(private route: ActivatedRoute, private authService: AuthService, private characterService: CharacterService,
              private altvService: AltvService, private notify: NotifyService, private baseService: BaseService) {
              }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.descriptions = data.descriptions;
    });
  }

  createCharacter() {
    if (this.descriptions.length >= 3) {
      if (!this.baseService.hasPremium) {
        return this.notify.error('Wystąpił bląd!', 'Aby zapisać więcej niż 3 opisy musisz posiadać premium');
      }
    }
    this.newDescription.characterId = this.authService.getCharacterId();
    this.characterService.createCharacterDescription(this.authService.decodedToken.nameid, this.newDescription)
    .subscribe((res: CharacterDescription) => {
      this.descriptions.push(res);
    });
  }


  deleteDescription(description: CharacterDescription) {
    this.characterService.deleteCharacterDescription(this.authService.decodedToken.nameid, description).subscribe((result: boolean) => {
      console.log(result);
      if (result) {
        const descriptionToDelete = this.descriptions.find(d => d.id === description.id);
        console.log(descriptionToDelete.id);
        this.descriptions.splice(this.descriptions.indexOf(descriptionToDelete, 1));
      }
    });
  }

  setDescription(description: CharacterDescription) {
    this.altvService.emit('cef:setDescription', description);
  }

}
