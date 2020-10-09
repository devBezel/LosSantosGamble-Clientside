import * as alt from 'alt';
import { Key } from 'client/modules/Constant/Keys/Key';
import { View } from '../Utilities/View';
import { SmartphoneContactModel } from 'client/modules/Models/smartphoneContactModel';
import { SmartphoneRecentCallModel } from 'client/modules/Models/smartphoneRecentCallModel';
import { SmartphoneMessageModel } from 'client/modules/Models/smartphoneMessageModel';
import { SmartphoneCallModel } from 'client/modules/Models/smartphoneCallModel';
import { SmartphoneIncomingCallModel } from 'client/modules/Models/smartphoneIncomingCallModel';

export default async () => {
    let webView: View;

    alt.onServer('item-smartphone:getEnabledSmartphone', getEnabledSmartphone);
    alt.onServer('item:smartphone:incomingCall', smartphoneIncomingCall);
    alt.on('keyup', async (key: any) => {
        if (key === Key.END) {

            if (alt.Player.local.getMeta('viewOpen')) return;

            alt.emitServer('item-smartphone:getSmartphone');
        }
    });

    async function getEnabledSmartphone(smartphoneId: number, smartphoneNumber: number, smartphoneCredit: number, smartphoneMemory: number,
                                        smartphoneContacts: SmartphoneContactModel[], smartphoneRecentCalls: SmartphoneRecentCallModel[],
                                        smartphoneMessages: SmartphoneMessageModel[], smartphoneCall: SmartphoneCallModel, incomingCall: SmartphoneIncomingCallModel) {
            if (!webView) {
                webView = new View();
            }

            webView.open('', true, 'smartphone/menu', true);
            webView.emit('smartphone:data', smartphoneId, smartphoneNumber, smartphoneCredit, smartphoneMemory, smartphoneContacts, smartphoneRecentCalls, smartphoneMessages, smartphoneCall, incomingCall);
            webView.on('smartphone:sendMessage', sendMessage);
            webView.on('smartphone:call', call);
    }

    async function sendMessage(smartphoneId: number, smartphoneNumberGetter: number, message: string) {
        alt.emitServer('item-smartphone:sendMessage', smartphoneId, smartphoneNumberGetter, message);
    }

    async function call(getterNumber: number) {
        alt.log('Wyslam komunikat do numeru ' + getterNumber);
        alt.emitServer('item-smartphone:call', getterNumber);
    }

    async function smartphoneIncomingCall(callerNumber: number, getterNumber: number) {
        // tutaj będzie grała muzyczka

        alt.log('Ktoś dzwoni z numeru' + callerNumber);
    }
};
