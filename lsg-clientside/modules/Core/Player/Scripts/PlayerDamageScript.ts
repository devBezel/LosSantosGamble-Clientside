import * as alt from 'alt';
import * as game from 'natives';
import { Calculation } from '../../Utilities/Calculation';
import { NativeNotification } from '../../Notify/NativeNotification';
import { nativeNotificationType } from 'client/modules/Constant/Notification/NativeNotificationType';


export default async () => {

    const player = alt.Player.local;

    alt.onServer('player-damage:drawFall', playerDrawFall);


    async function playerDrawFall() {
        const probabilityOfCollapse = Calculation.probability(10);
        alt.log(probabilityOfCollapse);
        if (!probabilityOfCollapse) return;

        alt.log('wykonuje efekty');

        NativeNotification.showNotification(null, nativeNotificationType.Normal, 0, 'Twoja postać doznała szoku', '~g~ Stan zdrowia', 'Napij się wody lub poproś, aby Cie ktoś otrząsnął', 1);

        game.setCamEffect(2);
        game.playSound(Number('g_42DE._f69'), 'CHARACTER_CHANGE_DPAD_DOWN_MASTER', '', true, 0, true);

        const radgollInterval = alt.setInterval(() => {
            game.setPedToRagdoll(alt.Player.local.scriptID, 100 * 10, 1000 * 10, 0, true, true, false);
        },                                      1000);


        alt.on('player-interaction:help', async () => {
            // Usuwanie efektów utracenia przytomnosci
            game.clearPedTasks(player.scriptID);
            alt.clearInterval(radgollInterval);
            game.playSound(-1, 'CANCEL', 'HUD_MINI_GAME_SOUNDSET', false, 0, false);

            alt.setTimeout(() => {
                game.setCamEffect(0);
            },             5000);

            alt.emit('notify:success', null, 'Ktoś udzielił Ci pomocy');
        });
    }
};
