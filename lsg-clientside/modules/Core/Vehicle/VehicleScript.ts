import * as alt from 'alt';
import { Vehicle } from 'client/modules/Models/vehicle';
import { View } from '../Utilities/View';
import { Key } from 'client/modules/Constant/Keys/Key';
import { Item } from 'client/modules/Models/Item';


export default async() => {
    let webView: View;

    // alt.on('keyup', async (key: any) => {
    //     if (key === Key.ESCAPE) {
    //         if (webView === null || webView === undefined) {
    //             return;
    //         }
    //         webView.close();
    //     }
    // });


    alt.onServer('vehicle:openWindow', openVehicleWindow);
    alt.onServer('vehicle-script:vehicleInfo', vehicleInfoWindow);
    // alt.on('vehicle:vehicleSpawn', sendVehicleToServer);


    async function openVehicleWindow(vehicleList: Vehicle[]) {
        alt.log(vehicleList.length);
        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open('', true, 'character/vehicle');
        webView.emit('cef:vehicleList', vehicleList);
        webView.on('cef:vehicleSpawn', sendVehicleToServer);
    }

    async function sendVehicleToServer(vehicleId: number) {
        alt.emitServer('vehicle:spawnVehicle', vehicleId);
    }


    async function vehicleInfoWindow(upgrades: Item[]) {
        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open('', true, 'vehicle/info', false);
        webView.emit('vehicle-script:vehicleInfo', upgrades);
    }

};
