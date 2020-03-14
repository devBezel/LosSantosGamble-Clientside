import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { Group } from 'src/app/_models/group';
import { GroupData } from 'src/app/_models/GroupData';

export enum GroupInterface {
  Information,
  Workers,
  Vehicles,
  Profile
}

@Component({
  selector: 'app-group-panel',
  templateUrl: './group-panel.component.html',
  styleUrls: ['./group-panel.component.css']
})
export class GroupPanelComponent implements OnInit {
  informationSection: GroupInterface = GroupInterface.Information;
  groupData: GroupData;

  constructor(private baseService: BaseService) { }

  ngOnInit() {
    setTimeout(() => {
      this.groupData = this.baseService.groupData;
    }, 2);
  }

}
