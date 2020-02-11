import * as alt from 'alt';
import * as game from 'natives';

export default async() => {

    alt.on('connectionComplete', () => {
        alt.initVoice(64000);
        alt.setNoiseSuppressionStatus(true);
        alt.enableVoiceTest();
        alt.setMicGain(4);
    });

    alt.setInterval(() => {
        const tagID = game.createFakeMpGamerTag(alt.Player.local.scriptID, '', true, true, 'AUDIO_ICON', 0);
        game.setMpGamerTagAlpha(tagID, 4, 100);
        game.setMpGamerTagColour(tagID, 4, 210);


        if (game.isControlJustPressed(0, 249)) {
            alt.enableVoiceActivation(0, 0);
            game.setMpGamerTagVisibility(tagID, 4, true, 100);
        } else if (game.isControlJustReleased(0, 249)) {
            alt.disableVoiceActivation();
            game.setMpGamerTagVisibility(tagID, 4, false, 100);
        }
    },              0);
};
