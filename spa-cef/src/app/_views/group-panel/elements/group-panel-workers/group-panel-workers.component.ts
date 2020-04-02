import { Component, OnInit, Input } from '@angular/core';
import { GroupWorker } from 'src/app/_models/groupWorker';
import { GroupRights } from 'src/app/_enums/GroupRights';
import { GroupRightsService } from 'src/app/_services/group-rights.service';
import { GroupData } from 'src/app/_models/GroupData';

@Component({
  selector: 'app-group-panel-workers',
  templateUrl: './group-panel-workers.component.html',
  styleUrls: ['./group-panel-workers.component.css']
})
export class GroupPanelWorkersComponent implements OnInit {

  @Input() groupData: GroupData;

  constructor(public groupRights: GroupRightsService) { }

  ngOnInit() {

  }

  test(worker: GroupWorker) {
    console.log(this.groupRights.canDepositWithdrawMoney(worker.rights));
  }

}
