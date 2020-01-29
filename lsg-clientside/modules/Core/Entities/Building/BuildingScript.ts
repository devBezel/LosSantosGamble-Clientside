import * as alt from 'alt';
import * as game from 'natives';
import { View } from '../../Utilities/View';
import { Key } from 'client/modules/Constant/Keys/Key';

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

    alt.onServer('building:request', requestEnterBuilding);

    async function requestEnterBuilding(charge: number, name: string, enter: boolean) {
        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open('', true, 'doors', true);
        webView.emit('building:request', { charge, name, enter });
        webView.on('building:enterBuilding', enterBuilding);
        webView.on('building:exitBuilding', exitBuilding);
    }

    async function enterBuilding() {
        webView.close();

        alt.emitServer('building:enterBuilding');
    }

    async function exitBuilding() {
        webView.close();

        alt.emitServer('building:exitBuilding');
    }
};
