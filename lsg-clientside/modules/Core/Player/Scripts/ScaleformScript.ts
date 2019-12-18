import * as alt from 'alt';
import * as game from 'natives';
import { Position } from '../../Utilities/Position';
import { Player } from '../../Entities/Player';
import { Draw } from '../../Utilities/Draw';

export default async () => {
    alt.everyTick(async () => {
        alt.Player.all.forEach((player: alt.Player) => {
            const distanceFromLocal = Position.distance(player.pos, alt.Player.local.pos);

            if (distanceFromLocal >= 10) {
                return;
            }

            const result = game.getScreenCoordFromWorldCoord(player.pos.x, player.pos.y, player.pos.z + 1.0, undefined, undefined);

            if (!result[0]) {
                return;
            }

            let scale = distanceFromLocal / 25;
            if (scale < 0.5) {
                scale = 0.5;
            }

            if (scale > 0.6) {
                scale = 0.6;
            }

            let yMofidier = distanceFromLocal / 25 / 8;

            if (yMofidier > 0.05) {
                yMofidier = 0.5;
            }

            let y = result[2] - yMofidier;

            if (y <= 0) {
                y = 0;
            }

            const text = Player.getPlayerDescription(player);

            if (text === null || text === undefined) {
                return;
            }

            const textOne = text.content.slice(0, 64);
            const textTwo = text.content.slice(64, 128);
            const textThree = text.content.slice(128, 192);

            if (text.content.length > 0) {
                const desc = game.getScreenCoordFromWorldCoord(player.pos.x, player.pos.y, player.pos.z + 0.3, undefined, undefined);
                Draw.drawText(textOne, desc[1], desc[2], 0.3, 6, 255, 255, 255, 255, true, false);
            }
            if (text.content.length >= 64) {
                const desc = game.getScreenCoordFromWorldCoord(player.pos.x, player.pos.y, player.pos.z + 0.2, undefined, undefined);
                Draw.drawText(textTwo, desc[1], desc[2], 0.3, 6, 255, 255, 255, 255, true, false);
            }
            if (text.content.length >= 128) {
                const desc = game.getScreenCoordFromWorldCoord(player.pos.x, player.pos.y, player.pos.z + 0.1, undefined, undefined);
                Draw.drawText(textThree, desc[1], desc[2], 0.3, 6, 255, 255, 255, 255, true, false);
            }

        });
    });
};
