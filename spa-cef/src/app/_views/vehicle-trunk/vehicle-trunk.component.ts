import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/_models/item';
import { BaseService } from 'src/app/_services/base.service';

@Component({
  selector: 'app-vehicle-trunk',
  templateUrl: './vehicle-trunk.component.html',
  styleUrls: ['./vehicle-trunk.component.css']
})
export class VehicleTrunkComponent implements OnInit {

  trunkData: { characterItem: Item[], vehicleItem: Item[] };
  constructor(private baseService: BaseService) { }

  ngOnInit() {
    setTimeout(() => {
      this.trunkData = this.baseService.trunkData;
    }, 2);
  }

  insertItemFromVehicleToEquipment(item: Item) {

  }

  insertItemToVehicleMagazine(item: Item) {

  }

}
