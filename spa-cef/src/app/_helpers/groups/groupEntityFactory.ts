import { GroupType } from '../../_enums/groupType';
import { Police } from './police';

export class GroupEntityFactory {
    static Create(type: GroupType) {
        switch (type) {
            case GroupType.Police: return new Police();
            default:
                break;
        }
    }
}
