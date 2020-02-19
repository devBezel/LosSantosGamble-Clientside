import { Component, OnInit, Inject } from '@angular/core';
import { ShopAssortment } from 'src/app/_models/shopAssortment';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AltvService } from 'src/app/_services/altv.service';

export interface ItemShopData {
  item: ShopAssortment;
  count: number;
}


@Component({
  selector: 'app-buy-offer-shop-dialog',
  templateUrl: './buy-offer-shop-dialog.component.html',
  styleUrls: ['./buy-offer-shop-dialog.component.css']
})

export class BuyOfferShopDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public itemData: ItemShopData, private altvService: AltvService) { }

  buyItem(item: ItemShopData) {
    this.altvService.emit('shop:buyItem', item);
  }

}
