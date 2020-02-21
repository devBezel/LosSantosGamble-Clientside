import * as alt from 'alt';
import { Item } from 'client/modules/Models/Item';
import { View } from '../Utilities/View';

export default async () => {

    let webView: View;

    alt.onServer('vehicle-trunk:data', openWindowVehicleTrunkWithData);


    async function openWindowVehicleTrunkWithData(characterItem: Item[], vehicleItem: Item[]) {
        alt.log(`event dotarł: character${characterItem.length}, vehicle: ${vehicleItem.length}`);

        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open('', true, 'vehicle/trunk', false);
        webView.emit('trunk:data', { characterItem, vehicleItem });
    }

};
