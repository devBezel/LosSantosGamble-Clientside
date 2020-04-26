import { Group } from './group';
import { GroupWorker } from './groupWorker';
import { Vehicle } from './vehicle';
import { GroupRank } from './groupRank';

export interface GroupData {
    group: Group;
    workers: GroupWorker[];
    ranks: GroupRank[];
    vehicles: Vehicle[];
    worker: GroupWorker;
    slot: number;
}
