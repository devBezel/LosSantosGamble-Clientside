import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { Vehicle } from 'src/app/_models/vehicle';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-into-vehicle-interaction',
  templateUrl: './into-vehicle-interaction.component.html',
  styleUrls: ['./into-vehicle-interaction.component.css']
})
export class IntoVehicleInteractionComponent implements OnInit {

  constructor(private altvService: AltvService) { }

  ngOnInit() {
  }

  turnEngine() {
    this.altvService.emit('cef-vehicle-interaction:turnEngine');
  }

  getVehicleInfo() {
    this.altvService.emit('cef-vehicle-interaction:getVehicleInfo');
  }

}
