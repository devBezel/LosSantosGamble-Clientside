import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-offer-panel',
  templateUrl: './offer-panel.component.html',
  styleUrls: ['./offer-panel.component.css']
})
export class OfferPanelComponent implements OnInit {

  requestOffer: { titleOffer: string, senderId: number, offerType: number, index: number, cost: number };

  constructor(private baseService: BaseService, private altvService: AltvService) { }

  ngOnInit() {
    setTimeout(() => {
      this.requestOffer = this.baseService.requestOffer;
    }, 2);
  }

  offerRequestResult(accept: boolean) {
    this.altvService.emit('offer:requestResult', this.requestOffer, accept);
  }

}
