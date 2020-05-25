import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-smartphone-telephone-app',
  templateUrl: './smartphone-telephone-app.component.html',
  styleUrls: ['./smartphone-telephone-app.component.css']
})
export class SmartphoneTelephoneAppComponent implements OnInit {

  /* CurrentTelephoneCard Enum
    0 - Number
    1 - Contacts
    2 - Recent
    3 - Favorite

  */

  currentTelephoneCard = 0;

  constructor() { }

  ngOnInit() {
  }

  isCardSelected(app: number) {
    return this.currentTelephoneCard === app ? true : false;
  }

  changeCard(card: number) {
    this.currentTelephoneCard = card;
  }

}
