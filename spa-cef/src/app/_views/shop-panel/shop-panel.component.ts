import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopAssortment } from 'src/app/_models/shopAssortment';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { BaseService } from 'src/app/_services/base.service';
import { BuyOfferShopDialogComponent } from './elements/buy-offer-shop-dialog/buy-offer-shop-dialog.component';

@Component({
  selector: 'app-shop-panel',
  templateUrl: './shop-panel.component.html',
  styleUrls: ['./shop-panel.component.css']
})
export class ShopPanelComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Cost', 'Count', 'Options'];
  ELEMENT_DATA: ShopAssortment[] = [];
  countToBuy = 1;

  dataSource: MatTableDataSource<ShopAssortment>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private baseService: BaseService, public butItemOfferDialog: MatDialog) { }

  ngOnInit() {
    setTimeout(() => {
      this.ELEMENT_DATA = this.baseService.shopData;
      this.dataSource = new MatTableDataSource<ShopAssortment>(this.ELEMENT_DATA);

      this.dataSource.paginator = this.paginator;
    }, 2);
  }


  buyItemDialogOffer(itemToBuy: ShopAssortment) {
    const dialogRef = this.butItemOfferDialog.open(BuyOfferShopDialogComponent, {
      data: { item: itemToBuy, count: this.countToBuy }
    });
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

}
