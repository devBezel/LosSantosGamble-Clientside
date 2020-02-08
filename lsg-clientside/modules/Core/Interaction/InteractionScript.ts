import * as alt from 'alt';
import * as game from 'natives';
import { Key } from 'client/modules/Constant/Keys/Key';

export default async () => {

    let interactionPress: boolean = false;
    let inInteraction: boolean = false;
    let interactionInterval: number;


    alt.onServer('interaction', async (eventName: string, text: string, object: any) => {
        alt.log(`${eventName} ${text} ${object}`);


        game.beginTextCommandDisplayHelp('STRING');
        game.addTextComponentSubstringPlayerName(`Przyciśnij ~INPUT_CONTEXT~ ${text}`);
        game.endTextCommandDisplayHelp(0, false, false, -1);

        game.playSoundFrontend(-1, 'BACK', 'HUD_FRONTEND_DEFAULT_SOUNDSET', false);

        inInteraction = true;
        interactionInterval = alt.setInterval(() => {
            if (interactionPress) {
                alt.clearInterval(interactionInterval);
                alt.emitServer(eventName, object);

                interactionPress = false;
                inInteraction = false;
            }
        },                                    0);
    });

    alt.on('keyup', async (key: any) => {
        if (key === Key.E) {
            if (inInteraction) {
                interactionPress = true;
            }
        }
    });

    alt.onServer('interaction:clear', async () => {
        if (interactionInterval !== undefined) {
            alt.clearInterval(interactionInterval);
        }
        inInteraction = false;
        interactionPress = false;
    });
};
