import * as alt from 'alt';
import { View } from '../../Utilities/View';
import { ShopAssortment } from 'client/modules/Models/shopAssortment';
import { Key } from 'client/modules/Constant/Keys/Key';

export interface ItemShopData {
    item: ShopAssortment;
    count: number;
}

export default async () => {

    let webView: View;
    const player = alt.Player.local;

    alt.onServer('shop:data', openShopWindowWithData);

    alt.on('keyup', async (key: any) => {
        if (key === Key.ESCAPE) {
            if (webView === null || webView === undefined) {
                return;
            }
            webView.close();
        }
    });

    async function openShopWindowWithData(shopData: ShopAssortment[]) {
        if (!webView) {
            webView = new View();
        }
        alt.log(shopData.length);
        if (player.getMeta('viewOpen')) return;

        webView.open('', true, 'shop', true);
        webView.emit('shop:data', shopData);
        webView.on('shop:buyItem', buyItemInShop);
    }

    async function buyItemInShop(shopData: ItemShopData) {
        webView.close();
        alt.emitServer('shop:buyItem', shopData.count, JSON.stringify(shopData.item));
    }
};
