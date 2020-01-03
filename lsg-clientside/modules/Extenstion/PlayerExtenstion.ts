import * as alt from 'alt';
import { Account } from '../Models/account';
import { Character } from '../Models/character';

export default async () => {


    alt.onServer('account:hasPremium', async(result: boolean) => {
        return alt.Player.local.setMeta('account:premium', result);
    });

    alt.onServer('account:sendDataAccount', async(result: Account, id: number) => {
        alt.Player.local.setMeta('account:id', id);
        return alt.Player.local.setMeta('account:data', result);
    });

    alt.onServer('character:sendDataCharacter', async(result: Character) => {
        return alt.Player.local.setMeta('character:data', result);
    });

    alt.Player.prototype.serverID = function serverID(): number {
        return alt.Player.local.getMeta('account:id');
    };

    alt.Player.prototype.hasPremium = function hasPremium() {
        return alt.Player.local.getMeta('account:premium');
    };
    alt.Player.prototype.accountData = function accountData(): Account {
        return alt.Player.local.getMeta('account:data');
    };
    alt.Player.prototype.characterData = function characterData(): Character {
        return alt.Player.local.getMeta('character:data');
    };
};
