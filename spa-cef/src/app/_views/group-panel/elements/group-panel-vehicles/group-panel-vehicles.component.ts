import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from 'src/app/_models/vehicle';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-group-panel-vehicles',
  templateUrl: './group-panel-vehicles.component.html',
  styleUrls: ['./group-panel-vehicles.component.css']
})
export class GroupPanelVehiclesComponent implements OnInit {

  @Input() vehicles: Vehicle[];

  constructor(private altvService: AltvService) { }

  ngOnInit() {
  }

  respawnGroupVehicle(vehicle: Vehicle) {
    console.log(vehicle);
    this.altvService.emit('cef:vehicleSpawn', vehicle.id);
  }

}
