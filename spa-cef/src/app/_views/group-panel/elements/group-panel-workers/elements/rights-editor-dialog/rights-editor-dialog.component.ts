import { Component, OnInit, Inject } from '@angular/core';
import { GroupWorker } from 'src/app/_models/groupWorker';
import { MAT_DIALOG_DATA } from '@angular/material';
import { GroupRightsService } from 'src/app/_services/group-rights.service';
import { GroupRights } from 'src/app/_enums/GroupRights';
import { AltvService } from 'src/app/_services/altv.service';
import { Group } from 'src/app/_models/group';

@Component({
  selector: 'app-rights-editor-dialog',
  templateUrl: './rights-editor-dialog.component.html',
  styleUrls: ['./rights-editor-dialog.component.css']
})
export class RightsEditorDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public groupData: { worker: GroupWorker, slot: number, manager: GroupWorker, group: Group },
              public groupRights: GroupRightsService, private altvService: AltvService) { }

  canDepositWithdrawMoneyState: boolean = this.groupRights.canDepositWithdrawMoney(this.groupData.worker.rights);
  canOfferState: boolean = this.groupRights.canOffer(this.groupData.worker.rights);
  canMakeDoorsState: boolean = this.groupRights.canMakeDoors(this.groupData.worker.rights);
  canMakeOrdersState: boolean = this.groupRights.canMakeOrders(this.groupData.worker.rights);
  canRecruitmentWorkerState: boolean = this.groupRights.canRecruitmentWorker(this.groupData.worker.rights);
  canRespawnVehicleState: boolean = this.groupRights.canRespawnVehicle(this.groupData.worker.rights);



  validateChange() {
    let groupFlags: GroupRights;

    if (this.canOfferState) {
      // tslint:disable-next-line:no-bitwise
      groupFlags |= GroupRights.Offers;
    }
    if (this.canMakeDoorsState) {
      // tslint:disable-next-line:no-bitwise
      groupFlags |= GroupRights.Doors;
     }
    if (this.canRespawnVehicleState) {
      // tslint:disable-next-line:no-bitwise
      groupFlags |= GroupRights.Vehicle;
    }
    if (this.canRecruitmentWorkerState) {
      // tslint:disable-next-line:no-bitwise
      groupFlags |= GroupRights.Recruitment;
    }
    if (this.canMakeOrdersState) {
      // tslint:disable-next-line:no-bitwise
      groupFlags |= GroupRights.Orders;

    }
    if (this.canDepositWithdrawMoneyState) {
       // tslint:disable-next-line:no-bitwise
       groupFlags |= GroupRights.DepositWithdrawMoney;
     }
    if (groupFlags === undefined) {
       groupFlags = GroupRights.None;
     }

    this.groupData.worker.rights = groupFlags;
    this.altvService.emit('group:changeWorkerRights', this.groupData.worker.characterId, this.groupData.worker.rights, this.groupData.slot);
  }

}
