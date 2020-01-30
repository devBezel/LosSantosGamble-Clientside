import * as alt from 'alt';
import * as game from 'natives';
import { View } from '../../Utilities/View';
import { Key } from 'client/modules/Constant/Keys/Key';
import { Building } from 'client/modules/Models/building';

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
    alt.onServer('building:manageData', openWindowManageData);

    async function requestEnterBuilding(charge: number, name: string, enter: boolean, isCharacterOwner: boolean) {
        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open('', true, 'doors', false);
        webView.emit('building:request', { charge, name, enter, isCharacterOwner });
        webView.on('building:enterBuilding', enterBuilding);
        webView.on('building:exitBuilding', exitBuilding);
        webView.on('building:manage', getManageInformation);
    }

    async function enterBuilding() {
        webView.close();

        alt.emitServer('building:enterBuilding');
    }

    async function exitBuilding() {
        webView.close();

        alt.emitServer('building:exitBuilding');
    }

    async function getManageInformation() {
        webView.close();

        alt.emitServer('building:getManageData');
    }

    async function openWindowManageData(data: Building) {
        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open('', true, 'building/manage', false);
        webView.emit('building:data', data);
        webView.on('building:requestLock', requestLockBuilding);
    }

    async function requestLockBuilding() {
        alt.emitServer('building:requestLockBuilding');
    }
};
