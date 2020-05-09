import * as alt from 'alt';
import { View } from 'client/modules/Core/Utilities/View';
import { Item } from 'client/modules/Models/Item';
import { OfferType } from 'client/modules/Enum/OfferType';

export default async () => {

    let webView: View;

    alt.onServer('offer:getterShowWindow', showOfferWindow);
    async function showOfferWindow(titleOffer: string, senderId: number, offerType: OfferType, index: number, cost: number) {
        if (webView) {
            webView.close();
        }

        if (!webView) {
            webView = new View();
        }

        webView.open('', true, 'offer/request', true, true, false);
        webView.emit('offer:request', { titleOffer, senderId, offerType, index, cost });
        webView.on('offer:requestResult', offerRequestResult);
    }

    async function offerRequestResult(offerData: { titleOffer: string, senderId: number, offerType: number, index: number, cost: number }, accept: boolean) {
        webView.close();

        alt.emitServer('offer:windowRequestResult', offerData.titleOffer, offerData.senderId, offerData.offerType, offerData.index, offerData.cost, accept);
    }
};
