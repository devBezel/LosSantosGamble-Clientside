import { Group } from './group';
import { Character } from './character';
import { GroupRank } from './groupRank';

export interface GroupWorker {
    id: number;
    salary: number;
    dutyMinutes: number;
    rights: number;
    groupId: number;
    group: Group;
    characterId: number;
    character: Character;
    groupRankId: number;
    groupRank: GroupRank;
}
