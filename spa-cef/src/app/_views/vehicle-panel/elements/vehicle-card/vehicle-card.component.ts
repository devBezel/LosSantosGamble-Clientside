import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from 'src/app/_models/vehicle';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.css']
})
export class VehicleCardComponent implements OnInit {

  @Input() vehicleList: Vehicle[];
  constructor(private altvService: AltvService) { }

  ngOnInit() {
  }

  spawnVehicle(vehicle: Vehicle) {
    console.log(vehicle.id);
    this.altvService.emit('cef:vehicleSpawn', vehicle.id);
  }

}
