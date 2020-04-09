import { Group } from './group';
import { GroupWorker } from './groupWorker';
import { Vehicle } from './vehicle';

export interface GroupData {
    group: Group;
    workers: GroupWorker[];
    vehicles: Vehicle[];
    worker: GroupWorker;
    slot: number;
}
