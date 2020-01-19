import * as alt from 'alt';
import { Account } from '../Models/account';
import { Character } from '../Models/character';

export default async () => {


    // alt.onServer('account:hasPremium', async(result: boolean) => {
    //     return alt.Player.local.setMeta('account:premium', result);
    // });

    // alt.onServer('account:sendDataAccount', async(result: Account, id: number) => {

    //     alt.Player.local.setMeta('account:id', id);
    //     return alt.Player.local.setMeta('account:data', result);
    // });

    // alt.onServer('character:sendDataCharacter', async(result: Character) => {
    //     return alt.Player.local.setMeta('character:data', result);
    // });

    // alt.onServer('admin:setDuty', async (result: boolean) => {
    //     return alt.Player.local.setMeta('admin:duty', result);
    // });

    alt.Player.prototype.setPlayerReady = function setPlayerReady(state: boolean): void {
        return alt.Player.local.setMeta('player:ready', state);
    };




    alt.Player.prototype.serverID = function serverID(): number {
        return alt.Player.local.getSyncedMeta('account:id');
    };

    alt.Player.prototype.onAdminDuty = function onAdminDuty(): boolean {
        return alt.Player.local.getSyncedMeta('admin:setDuty');
    };

    alt.Player.prototype.hasPremium = function hasPremium() {
        return alt.Player.local.getSyncedMeta('account:hasPremium');
    };
    alt.Player.prototype.accountData = function accountData(): Account {
        return alt.Player.local.getSyncedMeta('account:dataAccount');
    };
    alt.Player.prototype.characterData = function characterData(): Character {
        return alt.Player.local.getSyncedMeta('character:dataCharacter');
    };
    alt.Player.prototype.isReady = function isReady(): boolean {
        return alt.Player.local.getSyncedMeta('player:ready');
    };
};
