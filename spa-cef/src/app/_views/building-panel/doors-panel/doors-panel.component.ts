import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-doors-panel',
  templateUrl: './doors-panel.component.html',
  styleUrls: ['./doors-panel.component.css']
})
export class DoorsPanelComponent implements OnInit {

  enterBuildingData: { charge: number, name: string, enter: boolean};

  constructor(private baseService: BaseService, private alvService: AltvService) { }

  ngOnInit() {
    setTimeout(() => {
      this.enterBuildingData = this.baseService.enterBuildingData;
      console.log(this.enterBuildingData);
    }, 5);
  }

  enterBuilding() {
    this.alvService.emit('building:enterBuilding');
  }

  exitBuilding() {
    this.alvService.emit('building:exitBuilding');
  }

}
