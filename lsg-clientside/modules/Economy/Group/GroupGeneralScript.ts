import * as alt from 'alt';
import { View } from 'client/modules/Core/Utilities/View';
import { Group } from 'client/modules/Models/group';
import { Key } from 'client/modules/Constant/Keys/Key';
import { GroupWorker } from 'client/modules/Models/groupWorker';
import { Vehicle } from 'client/modules/Models/vehicle';
import { Item } from 'client/modules/Models/Item';

export default async () => {

    const player = alt.Player.local;
    let webView: View;

    alt.on('keyup', async (key: any) => {
        if (key === Key.ESCAPE) {
            if (webView === null || webView === undefined) {
                return;
            }
            webView.close();
        }
    });


    alt.onServer('group-general:openGroupPanel', openGroupPanel);

    async function openGroupPanel(group: Group, workers: GroupWorker[], vehicles: Vehicle[], worker: GroupWorker, slot: number) {
        if (!webView) {
            webView = new View();
        }
        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open('', true, 'group/panel', true);

        webView.emit('group-general:dataGroup', { group, workers, vehicles, worker, slot });
        webView.on('cef:vehicleSpawn', respawnGroupVehicle);
        webView.on('group:changeWorkerRights', changeWorkerRights);
    }

    async function respawnGroupVehicle(vehicleId: number) {
        alt.emitServer('vehicle:spawnVehicle', vehicleId);
    }

    async function changeWorkerRights(characterId: number, characterRights: number, groupSlot: number) {
        alt.emitServer('group:changeWorkerRights', characterId, characterRights, groupSlot);
    }

    alt.onServer('group:searchPlayer', searchPlayer);
    async function searchPlayer(items: Item[]) {
        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;
        webView.open('', true, 'search/entity', true);
        webView.emit('group:searchPlayer', items);
        webView.on('group:confiscatePlayerItem', confiscatePlayerItem);
    }

    async function confiscatePlayerItem(item: Item) {
        alt.emitServer('group:confiscatePlayerItem', JSON.stringify(item));
    }
};
