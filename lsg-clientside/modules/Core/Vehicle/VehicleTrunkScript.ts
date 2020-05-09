import * as alt from 'alt';
import { Item } from 'client/modules/Models/Item';
import { View } from '../Utilities/View';
import { Key } from 'client/modules/Constant/Keys/Key';

export default async () => {

    let webView: View;

    alt.onServer('vehicle-trunk:data', openWindowVehicleTrunkWithData);

    // alt.on('keyup', async (key: any) => {
    //     if (key === Key.ESCAPE) {
    //         if (webView === null || webView === undefined) {
    //             return;
    //         }
    //         webView.close();
    //     }
    // });


    async function openWindowVehicleTrunkWithData(characterItem: Item[], vehicleItem: Item[]) {
        alt.log(`event dotarł: character${characterItem.length}, vehicle: ${vehicleItem.length}`);

        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open('', true, 'vehicle/trunk', false);
        webView.emit('trunk:data', { characterItem, vehicleItem });
        webView.on('trunk:putItemToEquipment', putItemToEquipment);
        webView.on('trunk:putItemToVehicleTrunk', putItemToVehicleTrunk);
    }

    async function putItemToEquipment(itemID: number) {
        alt.emitServer('trunk:putItemToEquipment', itemID);
    }

    async function putItemToVehicleTrunk(itemID: number) {
        alt.emitServer('trunk:putItemToVehicleTrunk', itemID);
    }
};
