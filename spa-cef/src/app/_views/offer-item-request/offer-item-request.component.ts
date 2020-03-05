import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { AltvService } from 'src/app/_services/altv.service';
import { Item } from 'src/app/_models/item';

@Component({
  selector: 'app-offer-item-request',
  templateUrl: './offer-item-request.component.html',
  styleUrls: ['./offer-item-request.component.css']
})
export class OfferItemRequestComponent implements OnInit {

  offerItemData: { item: Item, cost: number, sender: any };

  constructor(private baseService: BaseService, private altvService: AltvService) { }

  ngOnInit() {
    setTimeout(() => {
      this.offerItemData = this.baseService.requestOffer;
    }, 2);
  }

  offerRequestResult(accept: boolean) {
    this.altvService.emit('inventory:offerRequestResult', this.offerItemData, accept);
  }

}
