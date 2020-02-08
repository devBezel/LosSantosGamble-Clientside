import * as alt from 'alt';
import * as game from 'natives';
import { Key } from 'client/modules/Constant/Keys/Key';
import { Item } from 'client/modules/Models/Item';
import { View } from '../Utilities/View';


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

    async function openInventoryWidnow(items: Item[], usedItem: any) {
        if (!webView) {
            webView = new View();
        }
        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open('', true, 'inventory', true);
        webView.emit('inventory:items', items);
        webView.on('inventory:useItem', useItem);
    }

    async function useItem(id: number) {
        webView.close();

        alt.emitServer('inventory:useItem', id);
    }
};
