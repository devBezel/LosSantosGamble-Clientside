import * as alt from 'alt';
import * as game from 'natives';
import { View } from '../../Utilities/View';
import { Key } from 'client/modules/Constant/Keys/Key';
import { Building } from 'client/modules/Models/building';
import { Item } from 'client/modules/Models/Item';
import { BuildingTenant } from 'client/modules/Models/buildingTenant';

export default async () => {

    const player = alt.Player.local;

    let webView: View;

    // alt.on('keyup', async (key: any) => {
    //     if (key === Key.ESCAPE) {
    //         if (webView === null || webView === undefined) {
    //             return;
    //         }
    //         webView.close();
    //     }
    // });

    alt.onServer('building:request', requestEnterBuilding);
    alt.onServer('building:manageData', openWindowManageData);


    async function requestEnterBuilding(charge: number, name: string, enter: boolean, isCharacterOwner: boolean, isCharacterTenant: boolean) {
        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open('', true, 'doors', true);
        webView.emit('building:request', { charge, name, enter, isCharacterOwner, isCharacterTenant });
        webView.on('building:enterBuilding', enterBuilding);
        webView.on('building:exitBuilding', exitBuilding);
        webView.on('building:manage', getManageInformation);
        webView.on('building:requestLock', requestLockBuilding);
    }

    async function enterBuilding() {
        webView.close();

        alt.emitServer('building:enterBuilding');
    }

    async function exitBuilding() {
        webView.close();

        alt.emitServer('building:exitBuilding');
    }

    async function getManageInformation() {
        webView.close();

        alt.emitServer('building:getManageData');
    }

    async function openWindowManageData(data: Building, buildingItems: Item[], playerItems: Item[], playersInBuildingEvent: alt.Player[], tenant: BuildingTenant) {

        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;

        let playersInBuilding: { id: number, name: string }[] = [];
        playersInBuilding = [];

        playersInBuildingEvent.forEach((plr: alt.Player) => {
            playersInBuilding.push({ id: plr.getSyncedMeta('account:id'), name: plr.getSyncedMeta('character:name') });
        });

        webView.open('', true, 'building/manage', true);
        webView.emit('building:data', data, buildingItems, playerItems, playersInBuilding, tenant);
        webView.on('building:requestLock', requestLockBuilding);
        webView.on('building:editData', editBuildingData);
        webView.on('building:editOnSaleData', editOnSaleData);
        webView.on('building:withdrawBalance', withdrawBuildingBalance);
        webView.on('building:insertItemToMagazine', insertItemToMagazine);
        webView.on('building:insertItemFromMagazineToEquipment', insertItemFromMagazineToEquipment);
        webView.on('building:turnSbOut', playerTurnSbOut);
        webView.on('building:addPlayer', addPlayerToBuilding);
    }

    async function requestLockBuilding() {
        alt.emitServer('building:requestLockBuilding');
    }

    async function editBuildingData(name: string, entryFee: number) {
        alt.emitServer('building:editData', name, entryFee);
    }
    async function editOnSaleData(sale: boolean, saleCost: number) {
        alt.emitServer('building:editOnSaleData', sale, saleCost);
    }

    async function withdrawBuildingBalance(balance: number) {
        alt.emitServer('building:withdrawBalance', balance);
    }

    async function insertItemToMagazine(itemID: number) {
        alt.emitServer('building:insertItemToMagazine', itemID);
    }

    async function insertItemFromMagazineToEquipment(itemID: number) {
        alt.emitServer('building:insertItemFromMagazineToEquipment', itemID);
    }
    async function playerTurnSbOut(playerId: number) {
        alt.emitServer('building:turnSbOut', playerId);
    }
    async function addPlayerToBuilding(playerId: number) {
        alt.emitServer('building:addPlayer', playerId);
    }
};
