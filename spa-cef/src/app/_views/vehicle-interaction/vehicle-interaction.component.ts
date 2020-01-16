import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { Vehicle } from 'src/app/_models/vehicle';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-vehicle-interaction',
  templateUrl: './vehicle-interaction.component.html',
  styleUrls: ['./vehicle-interaction.component.css']
})
export class VehicleInteractionComponent implements OnInit {

  vehicle: Vehicle;

  constructor(private baseService: BaseService, private altvService: AltvService) { }

  ngOnInit() {
    setTimeout(() => {
        this.vehicle = this.baseService.vehicleDataInteraction;
    }, 5);
  }

  openVehicle() {
    console.log('klikam zamek');
    this.altvService.emit('cef-vehicle-interaction:openVehicle', this.vehicle);
  }
  openDoor(door: number) {
    console.log('klikam');
    this.altvService.emit('cef-vehicle-interaction:openDoor', this.vehicle, door);
  }
}
