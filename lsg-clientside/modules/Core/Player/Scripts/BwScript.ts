import * as alt from 'alt';
import * as game from 'natives';
import { Loading } from '../../Utilities/LoadingScreen';


export default async () => {
    alt.onServer('bw:timerStart', bwStartTimer);

    async function bwStartTimer(time: number) {
        let toCountDown = time * 60;
        let minutes: number = 0;
        let seconds: number = 0;

        game.playSoundFrontend(-1, 'LOSER', 'HUD_AWARDS', true);

        const bwInterval = alt.setInterval(() => {
            minutes = Math.floor(toCountDown / 60);
            seconds = toCountDown - minutes * 60;

            toCountDown--;
            alt.log(`${minutes} : ${seconds}`);

            Loading.show(`Otrzymałeś BW: ${minutes} min ${seconds} sek`);

            if (toCountDown < 0) {

                game.clearPedBloodDamage(alt.Player.local.scriptID);

                alt.clearInterval(bwInterval);
                Loading.hide();

                alt.emitServer('bw:gone');
            }
        },                                 1000);

        alt.onServer('bw:revive', async () => {
            toCountDown = 0;
        });
    }
};
