import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { Vehicle } from 'src/app/_models/vehicle';
import { ActivatedRoute } from '@angular/router';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-vehicle-panel',
  templateUrl: './vehicle-panel.component.html',
  styleUrls: ['./vehicle-panel.component.css']
})
export class VehiclePanelComponent implements OnInit {

  vehicleList: Vehicle[];

  selectedVehicle: Vehicle;
  vehicleState: { vehicleId: number, selected: boolean };

  constructor(private baseService: BaseService, private altvService: AltvService) {
   }

  ngOnInit() {
    setTimeout(() => {
      this.vehicleList = this.baseService.vehicleList;
      this.selectVehicle(this.vehicleList[0]);
    }, 2);
  }

  isSelected(vehicle: Vehicle) {
    return (this.vehicleState.vehicleId === vehicle.id) && this.vehicleState.selected ? true : false;
  }

  selectVehicle(vehicle: Vehicle) {
    this.vehicleState = { vehicleId: vehicle.id, selected: true };
    this.selectedVehicle = vehicle;

    console.log(`${this.selectedVehicle.r}, ${this.selectedVehicle.g}, ${this.selectedVehicle.b}`);
  }

  respawnVehicle(vehicleId: Vehicle) {
    this.altvService.emit('cef:vehicleSpawn', vehicleId);
  }

}
