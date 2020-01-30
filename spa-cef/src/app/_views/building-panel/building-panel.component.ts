import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { Building } from 'src/app/_models/building';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-building-panel',
  templateUrl: './building-panel.component.html',
  styleUrls: ['./building-panel.component.css']
})
export class BuildingPanelComponent implements OnInit {

  buildingData?: Building;
  constructor(private baseService: BaseService, private altvService: AltvService) { }

  ngOnInit() {
    setTimeout(() => {
      this.buildingData = this.baseService.buildingData;
    }, 2);
  }

  public get hasCCTV() {
    if (!this.buildingData.hasCCTV) {
      return 'Nie';
    }

    return 'Tak';
  }

  public get onSale() {
    if (!this.buildingData.onSale) {
      return 'Nie';
    }

    return 'Tak';
  }

  lockBuilding() {
    this.altvService.emit('building:requestLock');
  }

}
