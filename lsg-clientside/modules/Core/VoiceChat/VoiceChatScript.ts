import * as alt from 'alt';
import * as game from 'natives';

export default async() => {

    const player = alt.Player.local;

    alt.setInterval(() => {
        const tagID = game.createFakeMpGamerTag(alt.Player.local.scriptID, '', true, true, 'AUDIO_ICON', 0);
        game.setMpGamerTagAlpha(tagID, 4, 100);
        game.setMpGamerTagColour(tagID, 4, 210);

        if (player.isTalking) {
            game.setMpGamerTagVisibility(tagID, 4, true, 100);
        } else {
            game.setMpGamerTagVisibility(tagID, 4, false, 100);
        }
    },              5);
};
