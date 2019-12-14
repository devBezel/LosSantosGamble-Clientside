import * as alt from 'alt';
import { View } from '../../Utilities/View';
import { Key } from 'client/modules/Constant/Keys/Key';


export default async () => {
    let webView: View;
    const url = 'http://localhost:4200/character/description';

    alt.onServer('description:getCharacterDescription', showDescriptionWindow);

    alt.on('keyup', async (key: any) => {
        if (key === Key.ESCAPE) {
            webView.close();
        }
    });

    async function showDescriptionWindow() {
        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open(url, true);
    }
};
