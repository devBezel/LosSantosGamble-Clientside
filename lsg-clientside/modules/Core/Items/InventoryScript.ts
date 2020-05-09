import * as alt from 'alt';
import * as game from 'natives';
import { Key } from 'client/modules/Constant/Keys/Key';
import { Item } from 'client/modules/Models/Item';
import { View } from '../Utilities/View';
import { Calculation } from '../Utilities/Calculation';
import { OfferType } from 'client/modules/Enum/OfferType';


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

    alt.on('keyup', async(key: any) => {
        if (player.getMeta('viewOpen')) return;

        if (key === Key.I) {
            alt.emitServer('inventory:getItems');
        }
    });

    alt.onServer('inventory:items', openInventoryWidnow);

    async function openInventoryWidnow(items: Item[], usedItem: any) {
        if (!webView) {
            webView = new View();
        }
        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open('', true, 'inventory', true);
        webView.emit('inventory:items', items);
        webView.on('inventory:useItem', useItem);
        webView.on('inventory:offerItem', offerItemFromInventoryWindow);
    }

    async function useItem(id: number) {
        webView.close();

        alt.emitServer('inventory:useItem', id);
    }

    async function offerItemFromInventoryWindow(item: Item, playerID: number, costItem: number) {
        const getter: alt.Player = alt.Player.all.find((x: alt.Player) => x.getSyncedMeta('account:id') === playerID);

        if (getter === undefined || player === null) {
            return alt.emit('notify:error', 'Nie ma takiego gracza', 'Gracz o podanym ID nie znajduje się w grze');
        }


        webView.close();
        alt.emitServer('offer:playerSend', item.name, playerID, OfferType.Item, item.id, costItem);
    }


};
