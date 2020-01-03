import * as alt from 'alt';
import { View } from '../../Utilities/View';
import { Key } from 'client/modules/Constant/Keys/Key';
import { CharacterDescription } from 'client/modules/Models/characterDescription';
import { Player } from '../../Entities/Player';


export default async () => {
    let webView: View;

    alt.onServer('description:getCharacterDescription', showDescriptionWindow);

    alt.on('keyup', async (key: any) => {
        if (key === Key.ESCAPE) {
            if (webView === null || webView === undefined) {
                return;
            }
            webView.close();
        }
    });

    async function showDescriptionWindow() {
        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open('', true, 'character/description');

        webView.emit('cef:descriptionHasPremium', alt.Player.local.hasPremium());
        webView.on('cef:setDescription', setDescription);
    }

    async function setDescription(description: CharacterDescription) {
        Player.setPlayerDescription(alt.Player.local, description);
    }

};
