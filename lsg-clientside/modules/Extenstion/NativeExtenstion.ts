import * as alt from 'alt';
import * as game from 'natives';

export default async () => {
    const player = alt.Player.local;

    alt.onServer('native-extenstion:freezeEntityPosition', async (toggle: boolean) => {
        game.freezeEntityPosition(player.scriptID, toggle);
    });
};
