import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/_models/character';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-characters-panel',
  templateUrl: './characters-panel.component.html',
  styleUrls: ['./characters-panel.component.css']
})
export class CharactersPanelComponent implements OnInit {

  characters: Character[];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
        this.characters = data.characters;
    });
  }

  selectCharacter(character: Character) {
    localStorage.setItem('characterId', character.id.toString());
      // @ts-ignore
    alt.emit('cef:character-selected', character);
    this.router.navigate(['character/creator']);
  }

}
