import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Item } from 'src/app/_models/item';
import { Building } from 'src/app/_models/building';
import { NotifyService } from 'src/app/_services/notify.service';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-building-magazine-dialog',
  templateUrl: './building-magazine-dialog.component.html',
  styleUrls: ['./building-magazine-dialog.component.css']
})
export class BuildingMagazineDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public buildingData?: { building: Building, buildingItems: Item[], playerItems: Item[] },
              private notify?: NotifyService, private altvService?: AltvService) { }

  insertItemToBuildingMagazine(item: Item) {
    if (item.itemInUse) {
      return this.notify.warning('Ekwipunek', 'Musisz odużyć przedmiot, aby wsadzić go do magazynu');
    }

    const itemToDelete = this.buildingData.playerItems.findIndex(i => i.id === item.id);
    this.buildingData.playerItems.splice(itemToDelete, 1);

    this.buildingData.buildingItems.push(item);

    this.altvService.emit('building:insertItemToMagazine', item.id);
  }

  insertItemFromBuildingToEquipment(item: Item) {
    const itemToDelete = this.buildingData.buildingItems.findIndex(i => i.id === item.id);

    this.buildingData.buildingItems.splice(itemToDelete, 1);
    this.buildingData.playerItems.push(item);

    this.altvService.emit('building:insertItemFromMagazineToEquipment', item.id);
  }

}
