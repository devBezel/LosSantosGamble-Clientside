import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-smartphone-telephone-contacts-card',
  templateUrl: './smartphone-telephone-contacts-card.component.html',
  styleUrls: ['./smartphone-telephone-contacts-card.component.css']
})
export class SmartphoneTelephoneContactsCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getAlphabet() {
    // tslint:disable-next-line:only-arrow-functions
    return [...Array(26)].map((_, y) => String.fromCharCode(y + 65));
  }
}
