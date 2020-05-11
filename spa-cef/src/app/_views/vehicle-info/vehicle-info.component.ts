import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { Item } from 'src/app/_models/item';
import { Vehicle } from 'src/app/_models/vehicle';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit {

  vehicleInfo: { vehicle: Vehicle, upgrades: Item[] };

  constructor(private baseService: BaseService, private altvService: AltvService) { }

  ngOnInit() {
    setTimeout(() => {
      this.vehicleInfo = this.baseService.vehicleInfo;
    }, 2);
  }

  removeUpgrade(upgrade: Item) {
    console.log(upgrade);
    this.altvService.emit('vehicle-script:removeUpgrade', upgrade);
  }
}
