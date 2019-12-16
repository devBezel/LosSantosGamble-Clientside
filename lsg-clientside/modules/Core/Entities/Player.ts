import * as alt from 'alt';
import { CharacterDescription } from 'client/modules/Models/characterDescription';

export class Player {
    public static setPlayerDescription(player: alt.Player, description: CharacterDescription) {
        if (this.getPlayerDescription(player) !== undefined) {
            player.setMeta('character:description', null);
        }

        player.setMeta('character:description', description);
        alt.emit('client:setDescription', description);
    }




    public static getPlayerDescription(player: alt.Player) : CharacterDescription {
        return player.getMeta('character:description');
    }

}
