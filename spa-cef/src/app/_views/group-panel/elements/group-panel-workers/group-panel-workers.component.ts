import { Component, OnInit, Input } from '@angular/core';
import { GroupWorker } from 'src/app/_models/groupWorker';
import { GroupRights } from 'src/app/_enums/GroupRights';
import { GroupRightsService } from 'src/app/_services/group-rights.service';
import { GroupData } from 'src/app/_models/GroupData';
import { MatDialog } from '@angular/material';
import { RightsEditorDialogComponent } from './elements/rights-editor-dialog/rights-editor-dialog.component';
import { RanksEditorDialogComponent } from './elements/ranks-editor-dialog/ranks-editor-dialog.component';

@Component({
  selector: 'app-group-panel-workers',
  templateUrl: './group-panel-workers.component.html',
  styleUrls: ['./group-panel-workers.component.css']
})
export class GroupPanelWorkersComponent implements OnInit {

  @Input() groupData: GroupData;

  constructor(public groupRights: GroupRightsService, public workersRightsEditorDialog: MatDialog,
              public workersRanksEditorDialog: MatDialog) { }

  ngOnInit() {

  }

  test(worker: GroupWorker) {
    console.log(this.groupRights.canDepositWithdrawMoney(worker.rights));
  }

  openWorkersRightsEditor(groupWorker: GroupWorker) {
    const dialogRef = this.workersRightsEditorDialog.open(RightsEditorDialogComponent, {
      data: { worker: groupWorker, slot: this.groupData.slot, manager: this.groupData.worker, group: this.groupData.group }
    });
  }

  openWorkersRanksEditor(groupWorker: GroupWorker) {
    const dialogRef = this.workersRanksEditorDialog.open(RanksEditorDialogComponent, {
      data: { worker: groupWorker, ranks: this.groupData.ranks, slot: this.groupData.slot,
            senderWorker: this.groupData.worker, group: this.groupData.group }
    });
  }

}
