import * as alt from 'alt';
import { View } from 'client/modules/Core/Utilities/View';
import { Item } from 'client/modules/Models/Item';

export default async () => {

    let webView: View;

    alt.onServer('inventory:sendRequestOffer', sendRequestOffer);
    async function sendRequestOffer(item: Item, cost: number, sender: number) {
        if (webView) {
            webView.close();
        }

        if (!webView) {
            webView = new View();
        }

        webView.open('', true, 'offer/request', true);
        webView.emit('inventory:requestOffer', { item, cost, sender });
        webView.on('inventory:offerRequestResult', offerRequestResult);
    }

    async function offerRequestResult(offerItemData: { item: Item, cost: number, sender: any }, accept: boolean) {
        webView.close();

        alt.emitServer('inventory:offerRequestResult', offerItemData.item.id, offerItemData.cost, offerItemData.sender, accept);
    }
};
