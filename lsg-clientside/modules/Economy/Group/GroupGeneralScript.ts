import * as alt from 'alt';
import { View } from 'client/modules/Core/Utilities/View';
import { Group } from 'client/modules/Models/group';
import { Key } from 'client/modules/Constant/Keys/Key';
import { GroupWorker } from 'client/modules/Models/groupWorker';
import { Vehicle } from 'client/modules/Models/vehicle';

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

    async function openGroupPanel(group: Group, workers: GroupWorker[], vehicles: Vehicle[]) {
        if (!webView) {
            webView = new View();
        }
        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open('', true, 'group/panel', true);

        webView.emit('group-general:dataGroup', { group, workers, vehicles });
        webView.on('cef:vehicleSpawn', respawnGroupVehicle);
    }

    async function respawnGroupVehicle(vehicleId: number) {
        alt.emit('vehicle:vehicleSpawn', vehicleId);
    }
};
