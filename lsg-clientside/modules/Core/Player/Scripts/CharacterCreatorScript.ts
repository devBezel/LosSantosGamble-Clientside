import * as alt from 'alt';
import * as game from 'natives';
import { View } from '../../Utilities/View';
import { Key } from 'client/modules/Constant/Keys/Key';

export default async () => {
    let webView: View;
    const url = 'http://localhost:4200/character/creator';


    alt.on('keyup', (key: any) => {
        if (key === Key.INSERT) {
            showCreationWindow();
        } else if (key === Key.ESCAPE) {
            webView.close();
        }
    });

    async function updateComponentVariation(id: number, drawable: number, texture: number, isProp: any) {
        const playerId = alt.Player.local.scriptID;
        if (isProp) {
            game.setPedPropIndex(playerId, id, drawable, texture, true);

            if (drawable === -1) {
                game.clearPedProp(playerId, id);
            }
        }

        game.setPedComponentVariation(playerId, id, drawable, texture, 0);
    }

    async function randomClothes() {
        const playerId = alt.Player.local.scriptID;
        alt.log('test');
        game.setPedRandomComponentVariation(playerId, 1);
    }

    async function clearClothes() {
        const playerId = alt.Player.local.scriptID;
        game.clearAllPedProps(playerId);
    }

    async function showCreationWindow() {
        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open(url, true);

        webView.on('cef:characterCreatorRandomClothes', randomClothes);
        webView.on('cef:characterCreatorClearClothes', clearClothes);
    }
};
