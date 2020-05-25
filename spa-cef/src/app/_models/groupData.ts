import { Group } from './group';
import { GroupWorker } from './groupWorker';
import { Vehicle } from './vehicle';
import { GroupRank } from './groupRank';
import { WarehouseItemModel } from './warehouseItemModel';

export interface GroupData {
    group: Group;
    workers: GroupWorker[];
    ranks: GroupRank[];
    vehicles: Vehicle[];
    warehouseItems: WarehouseItemModel[];
    worker: GroupWorker;
    slot: number;
}
