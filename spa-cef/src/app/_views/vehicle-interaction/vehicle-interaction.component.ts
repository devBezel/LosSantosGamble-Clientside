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


  constructor(private altvService: AltvService) { }

  ngOnInit() {
  }

  openVehicle() {
    console.log('klikam zamek');
    this.altvService.emit('cef-vehicle-interaction:openVehicle');
  }
  openDoor(door: number) {
    console.log('klikam');
    this.altvService.emit('cef-vehicle-interaction:openDoor', door);
  }
}
