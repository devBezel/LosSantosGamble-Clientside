import { Component, OnInit, Inject } from '@angular/core';
import { GroupWorker } from 'src/app/_models/groupWorker';
import { MAT_DIALOG_DATA } from '@angular/material';
import { GroupRightsService } from 'src/app/_services/group-rights.service';
import { GroupRights } from 'src/app/_enums/GroupRights';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-rights-editor-dialog',
  templateUrl: './rights-editor-dialog.component.html',
  styleUrls: ['./rights-editor-dialog.component.css']
})
export class RightsEditorDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public groupData: { worker: GroupWorker, slot: number }, public groupRights: GroupRightsService,
              private altvService: AltvService) { }

  canDepositWithdrawMoneyState: boolean = this.groupRights.canDepositWithdrawMoney(this.groupData.worker.rights);
  canOfferState: boolean = this.groupRights.canOffer(this.groupData.worker.rights);
  canMakeDoorsState: boolean = this.groupRights.canMakeDoors(this.groupData.worker.rights);
  canMakeOrdersState: boolean = this.groupRights.canMakeOrders(this.groupData.worker.rights);
  canRecruitmentWorkerState: boolean = this.groupRights.canRecruitmentWorker(this.groupData.worker.rights);
  canRespawnVehicleState: boolean = this.groupRights.canRespawnVehicle(this.groupData.worker.rights);



  validateChange() {
    if (this.canRespawnVehicleState) {
      this.groupData.worker.rights = GroupRights.Vehicle;
    }
    if (this.canOfferState) {
      this.groupData.worker.rights = GroupRights.Offers;
    }
    if (this.canRecruitmentWorkerState) {
      this.groupData.worker.rights = GroupRights.Recruitment;
    }
    if (this.canMakeOrdersState) {
      this.groupData.worker.rights = GroupRights.Orders;
    }
    if (this.canMakeDoorsState) {
      this.groupData.worker.rights = GroupRights.Doors;
     }
    if (this.canDepositWithdrawMoneyState) {
       this.groupData.worker.rights = GroupRights.DepositWithdrawMoney;
     }


    this.altvService.emit('group:changeWorkerRights', this.groupData.worker.characterId, this.groupData.worker.rights, this.groupData.slot);
  }

}
