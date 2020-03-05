import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Item } from 'src/app/_models/item';
import { NotifyService } from 'src/app/_services/notify.service';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-offerable-item-panel',
  templateUrl: './offerable-item-panel.component.html',
  styleUrls: ['./offerable-item-panel.component.css']
})
export class OfferableItemPanelComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public itemData: Item, private notify: NotifyService, private altvService: AltvService) { }

  playerID: number;
  costItem: number;

  offerItem(item: Item) {
    if (item.itemInUse) {
      return this.notify.error('Używasz ten przedmiot', 'aby móc oferować przedmioty musisz je najpierw odużyć');
    }

    this.altvService.emit('inventory:offerItem', item, this.playerID, this.costItem);
  }
}
