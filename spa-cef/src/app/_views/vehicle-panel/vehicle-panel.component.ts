import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { Vehicle } from 'src/app/_models/vehicle';

@Component({
  selector: 'app-vehicle-panel',
  templateUrl: './vehicle-panel.component.html',
  styleUrls: ['./vehicle-panel.component.css']
})
export class VehiclePanelComponent implements OnInit {

  vehicleList: Vehicle[];

  constructor(private baseService: BaseService) { }

  ngOnInit() {
    this.vehicleList = this.baseService.vehicleList;
  }

}
