import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-doors-panel',
  templateUrl: './doors-panel.component.html',
  styleUrls: ['./doors-panel.component.css']
})
export class DoorsPanelComponent implements OnInit {

  enterBuildingData: { charge?: number, name?: string, enter?: boolean, isCharacterOwner?: boolean};

  constructor(private baseService: BaseService, private altvService: AltvService) { }

  ngOnInit() {
    setTimeout(() => {
      this.enterBuildingData = this.baseService.enterBuildingData;
      // console.log(this.enterBuildingData.isCharacterOwner);
    }, 2);
  }

  enterBuilding() {
    this.altvService.emit('building:enterBuilding');
  }

  exitBuilding() {
    this.altvService.emit('building:exitBuilding');
  }

  manageBuilding() {
    this.altvService.emit('building:manage');
  }

  lockBuilding() {
    this.altvService.emit('building:requestLock');
  }
}
