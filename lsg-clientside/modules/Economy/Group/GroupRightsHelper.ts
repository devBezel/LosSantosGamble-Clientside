import { GroupRights } from 'client/modules/Enum/groupRights';
import { Group } from 'client/modules/Models/group';
import { GroupWorker } from 'client/modules/Models/groupWorker';

export class GroupRightsHelper {

    static hasFlag(val: number, flag: number) {
        // tslint:disable-next-line:no-bitwise
        return (val & flag) !== 0;
    }

    public static canRespawnVehicle(userRights: GroupRights) {
        return this.hasFlag(userRights, GroupRights.Vehicle);
    }

    public static canDepositWithdrawMoney(userRights: GroupRights) {
        return this.hasFlag(userRights, GroupRights.DepositWithdrawMoney);
    }

    public static canRecruitmentWorker(userRights: GroupRights) {
        return this.hasFlag(userRights, GroupRights.Recruitment);
    }

    public static canMakeOrders(userRights: GroupRights) {
        return this.hasFlag(userRights, GroupRights.Orders);
    }

    public static canMakeDoors(userRights: GroupRights) {
        return this.hasFlag(userRights, GroupRights.Doors);
    }

    public static canOffer(userRights: GroupRights) {
        return this.hasFlag(userRights, GroupRights.Offers);
    }

    public static isOwner(group: Group, worker: GroupWorker) {
        return group.leaderId === worker.characterId ? true : false;
    }
}
