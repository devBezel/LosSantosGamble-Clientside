import * as alt from 'alt';
import * as game from 'natives';

export class NativeNotification {

    static showNotification(backgroundColor: number = null, notifyImage: string, iconType: number = 0, title: string, subtitle:string, message: string, durationMult: number) {
        game.beginTextCommandThefeedPost('STRING');
        game.addTextComponentSubstringPlayerName(message);
        if (backgroundColor != null) {
            game.setNotificationBackgroundColor(backgroundColor);
        }

        if (notifyImage != null) {
            game.endTextCommandThefeedPostMessagetextTu(notifyImage, notifyImage, false, iconType, title, subtitle, durationMult);
        }

        game.playSoundFrontend(Number('l_7BA'), 'ROBBERY_MONEY_TOTAL', 'HUD_FRONTEND_CUSTOM_SOUNDSET', true);

        return game.endTextCommandThefeedPostTicker(false, true);
    }
}
