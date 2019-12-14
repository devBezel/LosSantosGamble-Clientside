import { Component, OnInit } from '@angular/core';
import { CharacterDescription } from 'src/app/_models/characterDescription';
import { ActivatedRoute } from '@angular/router';
import { CharacterDescriptionResolver } from 'src/app/_resolvers/character-description.resolver';

@Component({
  selector: 'app-character-description-panel',
  templateUrl: './character-description-panel.component.html',
  styleUrls: ['./character-description-panel.component.css']
})
export class CharacterDescriptionPanelComponent implements OnInit {

  descriptions: CharacterDescription[];
  newDescription: CharacterDescription = new CharacterDescription();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.descriptions = data.descriptions;
    });
  }

}
