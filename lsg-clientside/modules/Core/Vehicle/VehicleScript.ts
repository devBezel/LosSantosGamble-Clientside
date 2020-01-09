import * as alt from 'alt';
import { Vehicle } from 'client/modules/Models/vehicle';
import { View } from '../Utilities/View';
import { Key } from 'client/modules/Constant/Keys/Key';


export default async() => {
    let webView: View;

    alt.on('keyup', async (key: any) => {
        if (key === Key.ESCAPE) {
            if (webView === null || webView === undefined) {
                return;
            }
            webView.close();
        }
    });


    alt.onServer('vehicle:openWindow', openVehicleWindow);


    async function openVehicleWindow(vehicleList: Vehicle) {
        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open('', true, 'character/vehicle');
        webView.emit('cef:vehicleList', vehicleList);
        webView.on('cef:vehicleSpawn', sendVehicleToServer);
    }

    async function sendVehicleToServer(vehicle: Vehicle) {
        alt.log(vehicle.id);
        alt.emitServer('vehicle:spawnVehicle', JSON.stringify(vehicle));
    }

};
