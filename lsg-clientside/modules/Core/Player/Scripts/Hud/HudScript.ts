import * as alt from 'alt';

export default async () => {
    const webView: alt.WebView = new alt.WebView('http://resources/ls_gamble/client/lsg_player_hud/index.html');
    const player = alt.Player.local;

    alt.on('player:ready', async () => {
        webView.emit('hud:basicInformation', player.characterData(), player.getSyncedMeta('character:hunger'), player.getSyncedMeta('character:thirsty'));
    });

    // TODO: Sprawdzić czy dziala i naprawić character money
    alt.on('syncedMetaChange', async (entity: alt.Entity, key: string, value: any) => {
        switch (key) {
            case 'character:hunger': return webView.emit('hud:updateHunger', player.getSyncedMeta('character:hunger'));
            case 'character:thirsty': return webView.emit('hud:updateThirsty', player.getSyncedMeta('character:thirsty'));
            // case 'character:money': alt.log(`wykonuje zmiane pieniedzy ${player.getSyncedMeta('character:money')}`); return webView.emit('hud:updateMoney', player.getSyncedMeta('character:money'));
            default:
                break;
        }
    });

    alt.on('syncedMetaChange', async (entity: alt.Entity, key: string, value: any) => {
        if (key === 'character:money') {
            return webView.emit('hud:updateMoney', player.getSyncedMeta('character:money'));
        }
    });
};
