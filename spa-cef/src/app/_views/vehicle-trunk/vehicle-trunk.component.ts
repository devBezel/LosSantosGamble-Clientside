import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/_models/item';
import { BaseService } from 'src/app/_services/base.service';
import { AltvService } from 'src/app/_services/altv.service';
import { NotifyService } from 'src/app/_services/notify.service';

@Component({
  selector: 'app-vehicle-trunk',
  templateUrl: './vehicle-trunk.component.html',
  styleUrls: ['./vehicle-trunk.component.css']
})
export class VehicleTrunkComponent implements OnInit {

  trunkData: { characterItem: Item[], vehicleItem: Item[] };
  constructor(private baseService: BaseService, private altvService: AltvService, private notify: NotifyService) { }

  ngOnInit() {
    setTimeout(() => {
      this.trunkData = this.baseService.trunkData;
    }, 2);
  }

  insertItemFromVehicleToEquipment(item: Item) {

    this.trunkData.characterItem.push(item);

    const itemToDelete = this.trunkData.vehicleItem.findIndex(i => i.id === item.id);
    this.trunkData.vehicleItem.splice(itemToDelete, 1);

    this.altvService.emit('trunk:putItemToEquipment', item.id);
  }

  insertItemToVehicleMagazine(item: Item) {
    if (item.itemInUse) {
      return this.notify.warning('Ekwipunek', 'Musisz odużyć przedmiot, aby wsadzić go do bagażnika');
    }

    this.trunkData.vehicleItem.push(item);

    const itemToDelete = this.trunkData.characterItem.findIndex(i => i.id === item.id);
    this.trunkData.characterItem.splice(itemToDelete, 1);

    this.altvService.emit('trunk:putItemToVehicleTrunk', item.id);
  }

}
