import { Component, OnInit, Input } from '@angular/core';
import { SmartphoneData } from 'src/app/_models/smartphoneData';
import { SmartphoneContactModel } from 'src/app/_models/smartphoneContactModel';

@Component({
  selector: 'app-smartphone-telephone-contacts-card',
  templateUrl: './smartphone-telephone-contacts-card.component.html',
  styleUrls: ['./smartphone-telephone-contacts-card.component.css']
})
export class SmartphoneTelephoneContactsCardComponent implements OnInit {

  @Input() smartphoneData: SmartphoneData;

  constructor() { }

  // Później do zmiany
  selectedContact: SmartphoneContactModel;

  ngOnInit() {
  }

  getAlphabet() {
    // tslint:disable-next-line:only-arrow-functions
    return [...Array(26)].map((_, y) => String.fromCharCode(y + 65));
  }

  selectContact(selectedContact: SmartphoneContactModel) {
    this.selectedContact = selectedContact;
  }

  isContactSelected() {
    return this.selectedContact !== undefined ? true : false;
  }
}
