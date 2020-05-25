import * as alt from 'alt';
import * as game from 'natives';
import { Animation } from '../Core/Utilities/Animation';

export default async () => {
    const player = alt.Player.local;

    alt.onServer('native-wrapper:playAnimation', async (animDic: string, animation: string, time: number, animFlag: number = 1) => {
        alt.log('Otrzymalem info o animacji');
        const anim = new Animation(animDic, animation, time, animFlag);

        await anim.loadAnimDictAsync();
        anim.playAnim();
    });

    // TOOO: Dorobić callback
    alt.onServer('native-wrapper:callNative', (native: string, args: any[]) => {

        if (args === null || args === undefined) {
            // @ts-ignore
            game[native]();
        } else {
            // @ts-ignore
            game[native].apply(null, args);
        }
    });
};
