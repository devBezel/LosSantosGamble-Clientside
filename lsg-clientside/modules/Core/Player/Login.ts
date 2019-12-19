import * as alt from 'alt';
import { View } from '../Utilities/View';
import { Character } from 'client/modules/Models/character';

export default async() => {
    let webView: View;
    const url: string = 'http://localhost:4000/login';
    alt.onServer('other:first-connect', async () => {
        showLoginWindow();
    });



     async function showLoginWindow() {
         console.log('test');
        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open(url, true);
        webView.on('cef:character-selected', characterDetails);
    }

    async function characterDetails(character: Character) {
        alt.Player.local.setMeta('character:data', character);

        webView.close();
        alt.emitServer('login:characterDetail', JSON.stringify(character));
    }
};
