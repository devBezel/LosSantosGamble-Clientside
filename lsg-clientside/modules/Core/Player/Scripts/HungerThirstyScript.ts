import * as alt from 'alt';
import * as game from 'natives';
import { hungerAndThirstyConfig } from 'client/modules/Configs/HungerAndThirstyConfig';

export default async () => {
    const player = alt.Player.local;

    const hungerAndThirstyInterval = alt.setInterval(() => {

        const playerHunger = player.getSyncedMeta('character:hunger');
        const playerThirsty = player.getSyncedMeta('character:thirsty');
        const playerHealth = game.getEntityHealth(player.scriptID);

        if (playerHunger === undefined || playerThirsty === undefined) return;

        alt.log(`playerHunger: ${playerHunger} playerThirsty: ${playerThirsty}`);

        if (playerHunger < 0 || playerThirsty < 0) {
            game.setEntityHealth(player.scriptID, playerHealth - hungerAndThirstyConfig.damageTaken, 0);
            return;
        }

        alt.emitServer('hungerThirsty:subtract');

    },                                               hungerAndThirstyConfig.msWait);
};
