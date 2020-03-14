import { Group } from './group';
import { GroupWorker } from './groupWorker';

export interface GroupRank {
    id: number;
    name: string;
    rights: number;
    salary: number;
    groupId: number;
    group: Group;
    defaultForGroupId: number;
    defaultForGroup: Group;
    workers: GroupWorker[];
}
