import { Component, OnInit } from '@angular/core';
import { CharacterDescription } from 'src/app/_models/characterDescription';
import { ActivatedRoute } from '@angular/router';
import { CharacterDescriptionResolver } from 'src/app/_resolvers/character-description.resolver';
import { AuthService } from 'src/app/_services/auth.service';
import { CharacterService } from 'src/app/_services/character.service';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-character-description-panel',
  templateUrl: './character-description-panel.component.html',
  styleUrls: ['./character-description-panel.component.css']
})
export class CharacterDescriptionPanelComponent implements OnInit {

  descriptions: CharacterDescription[];
  newDescription: CharacterDescription = new CharacterDescription();

  constructor(private route: ActivatedRoute, private authService: AuthService, private characterService: CharacterService,
              private altvService: AltvService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.descriptions = data.descriptions;
    });
  }

  createCharacter() {
    this.newDescription.characterId = this.authService.getCharacterId();
    this.characterService.createCharacterDescription(this.authService.decodedToken.nameid, this.newDescription)
    .subscribe((res: CharacterDescription) => {
      console.log(res.id);
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
