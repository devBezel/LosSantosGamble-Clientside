import * as alt from 'alt';
import * as game from 'natives';

export class NativeExtenstion {
    static getPlayerHealth(player: alt.Player): number {
        return game.getEntityHealth(player.scriptID);
    }
}
