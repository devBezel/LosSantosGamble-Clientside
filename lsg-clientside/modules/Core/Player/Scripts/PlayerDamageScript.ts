import * as alt from 'alt';
import * as game from 'natives';
import { Calculation } from '../../Utilities/Calculation';
import { NativeNotification } from '../../Notify/NativeNotification';
import { nativeNotificationType } from 'client/modules/Constant/Notification/NativeNotificationType';


export default async () => {

    const player = alt.Player.local;
    let playerInterval: number;
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

        playerInterval = radgollInterval;

        alt.setTimeout(() => {
            // Postać się otrząsa po 2 minutach
            characterHasBeenCalmedDown();

            NativeNotification.showNotification(null, nativeNotificationType.Normal, 0, 'Twoja postać się otrząsnęla', '~g~ Stan zdrowia', 'Minął czas szoku, twoja postać doszła do siebie', 1);
        },             120000);


        alt.on('player-interaction:help', async () => {
            // Ktoś pomaga postaci się otrząsnąć
            characterHasBeenCalmedDown();

            NativeNotification.showNotification(null, nativeNotificationType.Normal, 0, 'Twoja postać się otrząsnęla', '~g~ Stan zdrowia', 'Ktoś pomógł Ci się otrząsnąć', 1);
        });
    }

    async function characterHasBeenCalmedDown() {
        game.clearPedTasks(player.scriptID);
        alt.clearInterval(playerInterval);

        alt.setTimeout(() => {
            game.setCamEffect(0);
        },             5000);
    }
};
