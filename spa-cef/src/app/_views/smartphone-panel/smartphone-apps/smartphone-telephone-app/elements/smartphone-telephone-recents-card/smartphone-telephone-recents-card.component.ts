import { Component, OnInit, Input } from '@angular/core';
import { SmartphoneData } from 'src/app/_models/smartphoneData';

@Component({
  selector: 'app-smartphone-telephone-recents-card',
  templateUrl: './smartphone-telephone-recents-card.component.html',
  styleUrls: ['./smartphone-telephone-recents-card.component.css']
})
export class SmartphoneTelephoneRecentsCardComponent implements OnInit {

  @Input() smartphoneData: SmartphoneData;

  constructor() { }

  ngOnInit() {
  }

}
