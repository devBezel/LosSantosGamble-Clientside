import * as alt from 'alt';
import { CharacterDescription } from 'client/modules/Models/characterDescription';
import { Character } from 'client/modules/Models/character';


export class Player {
    public static getCharacterData(): Character {
        return alt.Player.local.getMeta('character:data');
    }


    public static setPlayerDescription(player: alt.Player, description: CharacterDescription) {
        if (this.getPlayerDescription(player) !== undefined) {
            player.setMeta('character:description', null);
        }
        alt.emitServer('character:setDescription', description.content);

        alt.emit('client:setDescription', description);
    }


    public static getPlayerDescription(player: alt.Player) : string {
        return player.getSyncedMeta('character:description');
    }

}
