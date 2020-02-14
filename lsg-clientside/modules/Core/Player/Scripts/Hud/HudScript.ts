import * as alt from 'alt';

export default async () => {
    const webView: alt.WebView = new alt.WebView('http://resources/ls_gamble/client/lsg_player_hud/index.html');
    const player = alt.Player.local;

    alt.on('player:ready', async () => {
        webView.emit('hud:basicInformation', player.characterData(), player.getSyncedMeta('character:hunger'), player.getSyncedMeta('character:thirsty'));
    });

    // TODO: Sprawdzić czy dziala
    alt.on('syncedMetaChange', async (entity: alt.Entity, key: string, value: any) => {
        if (key === 'character:hunger' || key === 'character:thirsty') {
            alt.log('wysyłam emit');
            webView.emit('hud:updateInformation', player.getSyncedMeta('character:hunger'), player.getSyncedMeta('character:thirsty'));
        }
    });
};
