import * as alt from 'alt';
import * as game from 'natives';
import { Key } from 'client/modules/Constant/Keys/Key';
import { Item } from 'client/modules/Models/Item';
import { View } from '../Utilities/View';
import { Calculation } from '../Utilities/Calculation';


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

    alt.on('keyup', async(key: any) => {
        if (player.getMeta('viewOpen')) return;

        if (key === Key.I) {
            alt.emitServer('inventory:getItems');
        }
    });

    alt.onServer('inventory:items', openInventoryWidnow);
    alt.onServer('inventory:sendRequestOffer', sendRequestOffer);

    async function openInventoryWidnow(items: Item[], usedItem: any) {
        if (!webView) {
            webView = new View();
        }
        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open('', true, 'inventory', true);
        webView.emit('inventory:items', items);
        webView.on('inventory:useItem', useItem);
        webView.on('inventory:offerItem', offerItem);
    }

    async function useItem(id: number) {
        webView.close();

        alt.emitServer('inventory:useItem', id);
    }

    async function offerItem(item: Item, playerID: number, costItem: number) {
        const getter: alt.Player = alt.Player.all.find((x: alt.Player) => x.getSyncedMeta('account:id') === playerID);

        if (getter === undefined || player === null) {
            return alt.emit('notify:error', 'Nie ma takiego gracza', 'Gracz o podanym ID nie znajduje się w grze');
        }


        // const isInRange = Calculation.isPlayerInRange(alt.Player.local.pos, getter.pos, 3);

        // if (!isInRange) {
        //     webView.close();
        //     return alt.emit('notify:error', 'Brak gracza w pobliżu', `Gracza o ID: ${playerID} nie ma w pobliżu`);
        // }

        alt.emitServer('inventory:offerPlayerItem', JSON.stringify(item), getter, costItem);
    }

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

        alt.emitServer('inventory:offerRequestResult', JSON.stringify(offerItemData.item), offerItemData.cost, offerItemData.sender, accept);
    }
};
