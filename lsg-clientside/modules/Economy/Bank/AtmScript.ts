import * as alt from 'alt';
import * as game from 'natives';
import { View } from 'client/modules/Core/Utilities/View';
import { Key } from 'client/modules/Constant/Keys/Key';


export default async () => {
    let webView: View;

    // alt.on('keyup', async (key: any) => {
    //     if (key === Key.ESCAPE) {
    //         if (webView === null || webView === undefined) {
    //             return;
    //         }
    //         webView.close();
    //     }
    // });

    alt.onServer('atm:information', openAtmWindow);

    async function openAtmWindow(name: string, surname: string, money: number, bank: number) {
        if (!webView) {
            webView = new View();
        }
        if (alt.Player.local.getMeta('viewOpen')) return;

        alt.log(name, surname);
        webView.open('', true, 'atm');
        webView.emit('cef:atmInformation', { name, surname, money, bank });
        webView.on('cef:atmDeposit', depositMoney);
        webView.on('cef:atmWithdraw', withdrawMoney);
    }

    async function depositMoney(money: number) {
        webView.close();


        alt.emitServer('atm:deposit', money);
    }

    async function withdrawMoney(money: number) {
        webView.close();


        alt.emitServer('atm:withdraw', money);
    }
};
