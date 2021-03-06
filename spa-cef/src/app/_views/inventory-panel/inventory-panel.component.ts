import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { Item } from 'src/app/_models/item';
import { AltvService } from 'src/app/_services/altv.service';
import { MatDialog } from '@angular/material';
import { OfferableItemPanelComponent } from './elements/offerable-item-panel/offerable-item-panel.component';

@Component({
  selector: 'app-inventory-panel',
  templateUrl: './inventory-panel.component.html',
  styleUrls: ['./inventory-panel.component.css']
})
export class InventoryPanelComponent implements OnInit {
  inventoryItems: Item[];

  constructor(private baseService: BaseService, private altvService: AltvService,  public offerMenuDialog: MatDialog) { }

  ngOnInit() {
    setTimeout(() => {
      this.inventoryItems = this.baseService.inventoryItems;
    }, 2);
  }

  useItem(id: number) {
    this.altvService.emit('inventory:useItem', id);
  }

  openOfferMenu(item: Item) {
    const dialogRef = this.offerMenuDialog.open(OfferableItemPanelComponent, {
      data: item
    });
  }

}
