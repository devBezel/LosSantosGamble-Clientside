import { Injectable } from '@angular/core';
import { GroupRights } from '../_enums/GroupRights';

@Injectable({
  providedIn: 'root'
})
export class GroupRightsService {

  constructor() { }

  hasFlag(val: number, flag: number) {
    // tslint:disable-next-line:no-bitwise
    // return (val & flag) !== 0;

    return (val >= flag) ? true : false;
  }

  canRespawnVehicle(userRights: GroupRights) {
    return this.hasFlag(userRights, GroupRights.Vehicle);
  }

  canDepositWithdrawMoney(userRights: GroupRights) {
    return this.hasFlag(userRights, GroupRights.DepositWithdrawMoney);
  }

  canRecruitmentWorker(userRights: GroupRights) {
    return this.hasFlag(userRights, GroupRights.Recruitment);
  }

  canMakeOrders(userRights: GroupRights) {
    return this.hasFlag(userRights, GroupRights.Orders);
  }

  canMakeDoors(userRights: GroupRights) {
    return this.hasFlag(userRights, GroupRights.Doors);
  }
  canOffer(userRights: GroupRights) {
    return this.hasFlag(userRights, GroupRights.Offers);
  }

}
