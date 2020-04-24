import * as alt from 'alt';
import * as game from 'natives';
import { Animation } from '../Core/Utilities/Animation';

export default async () => {
    const player = alt.Player.local;

    alt.onServer('native-wrapper:freezeEntityPosition', async (toggle: boolean) => {
        game.freezeEntityPosition(player.scriptID, toggle);
    });

    alt.onServer('native-wrapper:playAnimation', async (animDic: string, animation: string, time: number, animFlag: number = 1) => {
        alt.log('Otrzymalem info o animacji');
        const anim = new Animation(animDic, animation, time, animFlag);

        await anim.loadAnimDictAsync();
        anim.playAnim();
    });

    alt.onServer('native-wrapper:setEnableHandcuffs', async (toggle: boolean) => {
        game.setEnableHandcuffs(player.scriptID, toggle);
    });

    alt.onServer('native-wrapper:clearPedTasks', async () => {
        game.clearPedTasks(player.scriptID);
    });

    alt.onServer('native-wrapper:disablePlayerFiring', async (toggle: boolean) => {
        game.disablePlayerFiring(player.scriptID, toggle);
    });

    alt.onServer('native-wrapper:setPedCanPlayGestureAnims', async (toggle: boolean) => {
        game.setPedCanPlayGestureAnims(player.scriptID, toggle);
    });
};
