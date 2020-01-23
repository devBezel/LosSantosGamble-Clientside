import * as alt from 'alt';
import * as game from 'natives';
import { Key } from 'client/modules/Constant/Keys/Key';
import { Item } from 'client/modules/Models/Item';


export default async () => {

    const player = alt.Player.local;

    alt.on('keyup', async(key: any) => {
        if (player.getMeta('viewOpen')) return;

        if (key === Key.I) {
            alt.emitServer('inventory:getItems');
        }
    });

    alt.onServer('inventory:items', openInventoryWidnow);

    async function openInventoryWidnow(items: Item[], usedItem: any) {
        for (let i = 0; i < items.length; i++) {
            alt.log(items[i].name);

        }
    }
};
