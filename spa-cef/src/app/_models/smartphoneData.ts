import { SmartphoneContactModel } from './smartphoneContactModel';
import { SmartphoneRecentCallModel } from './smartphoneRecentCallModel';
import { SmartphoneMessageModel } from './smartphoneMessageModel';
import { SmartphoneCallModel } from './smartphoneCallModel';
import { SmartphoneIncomingCallModel } from './smartphoneIncomingCallModel';

export interface SmartphoneData {
    smartphoneId: number;
    smartphoneNumber: number;
    smartphoneCredit: number;
    smartphoneMemory: number;
    smartphoneContacts: SmartphoneContactModel[];
    smartphoneRecentCalls: SmartphoneRecentCallModel[];
    smartphoneMessages: SmartphoneMessageModel[];
    smartphoneCall: SmartphoneCallModel;
    incomingCall: SmartphoneIncomingCallModel;
}
