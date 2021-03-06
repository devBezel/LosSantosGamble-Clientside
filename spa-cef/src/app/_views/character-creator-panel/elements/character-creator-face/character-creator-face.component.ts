import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { MatSliderChange } from '@angular/material';
import { AltvService } from 'src/app/_services/altv.service';
import { CharacterLook } from 'src/app/_models/characterLook';

@Component({
  selector: 'app-character-creator-face',
  templateUrl: './character-creator-face.component.html',
  styleUrls: ['./character-creator-face.component.css']
})
export class CharacterCreatorFaceComponent implements OnInit {
  @Input() characterLook: CharacterLook;

  constructor(private altvService: AltvService, private ref: ChangeDetectorRef) {
    // ref.detach();

    // setInterval(() => {
    //   this.ref.detectChanges();
    //   this.altvService.emit('cef:characterCreatorChangeFace', this.characterFace);
    // }, 200);

    // setInterval(() => {
    //   this.altvService.emit('cef:characterCreatorChangeFace', this.characterFace);
    // }, 200);

   }



  ngOnInit() {
  }

}
