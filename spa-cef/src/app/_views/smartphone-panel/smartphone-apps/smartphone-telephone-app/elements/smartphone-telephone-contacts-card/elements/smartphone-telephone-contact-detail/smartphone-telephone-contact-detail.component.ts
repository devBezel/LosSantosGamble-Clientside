import { Component, OnInit, Input } from '@angular/core';
import { SmartphoneContactModel } from 'src/app/_models/smartphoneContactModel';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-smartphone-telephone-contact-detail',
  templateUrl: './smartphone-telephone-contact-detail.component.html',
  styleUrls: ['./smartphone-telephone-contact-detail.component.css']
})
export class SmartphoneTelephoneContactDetailComponent implements OnInit {

  @Input() selectedContact: SmartphoneContactModel;

  constructor(private altvService: AltvService) { }

  ngOnInit() {
  }


  call() {
    this.altvService.emit('smartphone:call', this.selectedContact.number);
  }
}
