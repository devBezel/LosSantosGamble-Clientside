import { Injectable } from '@angular/core';
import { GroupRights } from '../_enums/GroupRights';
import { GroupWorker } from '../_models/groupWorker';
import { Group } from '../_models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupRightsService {

  constructor() { }

  // hasFlag(val: number, flag: number) {
  //   // tslint:disable-next-line:no-bitwise
  //   // return (val & flag) !== 0;

  //   return (val >= flag) ? true : false;
  // }

  hasFlag(val: number, flag: number) {
    // tslint:disable-next-line:no-bitwise
    return (val & flag) !== 0;
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

  isOwner(group: Group, worker: GroupWorker) {
    return group.leaderId === worker.characterId ? true : false;
  }

  canFirstRight(rankRights: GroupRights) {
    return this.hasFlag(rankRights, GroupRights.First);
  }

  canSecondRight(rankRights: GroupRights) {
    return this.hasFlag(rankRights, GroupRights.Second);
  }

  canThirdRight(rankRights: GroupRights) {
    return this.hasFlag(rankRights, GroupRights.Third);
  }

  canFourthRight(rankRights: GroupRights) {
    return this.hasFlag(rankRights, GroupRights.Fourth);
  }

  canFifthRight(rankRights: GroupRights) {
    return this.hasFlag(rankRights, GroupRights.Fifth);
  }

  canSixthRight(rankRights: GroupRights) {
    return this.hasFlag(rankRights, GroupRights.Sixth);
  }

  canSeventhRight(rankRights: GroupRights) {
    return this.hasFlag(rankRights, GroupRights.Seventh);
  }

  canEightRight(rankRights: GroupRights) {
    return this.hasFlag(rankRights, GroupRights.Eight);
  }

  canEightNinth(rankRights: GroupRights) {
    return this.hasFlag(rankRights, GroupRights.Ninth);
  }

}
