import * as alt from 'alt';
import * as game from 'natives';
import { Position } from '../../Utilities/Position';
import { Player } from '../../Entities/Player';
import { Draw } from '../../Utilities/Draw';
import { RankParser } from '../../Helpers/RankParser';

export default async () => {
    alt.everyTick(async () => {
        alt.Player.all.forEach((player: alt.Player) => {

            if (alt.Player.local.getMeta('scaleform:nicknameTurnOff')) { return; }

            const distanceFromLocal = Position.distance(player.pos, alt.Player.local.pos);
            if (distanceFromLocal >= 10) {
                return;
            }

            alt.setTimeout(() => {}, 3000);

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

            if (player.onAdminDuty() && player.hasPremium() && player.characterData().name) {
                const desc = game.getScreenCoordFromWorldCoord(player.pos.x, player.pos.y, player.pos.z + 1.05, undefined, undefined);
                Draw.drawText(`${RankParser.parse(player.accountData().rank)}`, desc[1], desc[2], 0.3, 6, 255, 255, 255, 255, true, false);
                Draw.drawText(`~y~ ${player.accountData().username} (${player.serverID()})`, result[1], y, 0.4, 6, 255, 255, 255, 255, true, false);
            } else if (player.onAdminDuty()) {
                const desc = game.getScreenCoordFromWorldCoord(player.pos.x, player.pos.y, player.pos.z + 1.05, undefined, undefined);
                Draw.drawText(`${RankParser.parse(player.accountData().rank)}`, desc[1], desc[2], 0.3, 6, 255, 255, 255, 255, true, false);
                Draw.drawText(`${player.accountData().username} (${player.serverID()})`, result[1], y, 0.4, 6, 255, 255, 255, 255, true, false);
            } else if (player.hasPremium()) {
                Draw.drawText(`~y~ ${player.characterData().name} ${player.characterData().surname} (${player.serverID()})`, result[1], y, 0.4, 6, 255, 255, 255, 255, true, false);
            } else {
                Draw.drawText(`${player.characterData().name} ${player.characterData().surname} (${player.serverID()})`, result[1], y, 0.4, 6, 255, 255, 255, 255, true, false);
            }


            const text = Player.getPlayerDescription(player);

            if (text === null || text === undefined) {
                return;
            }
            if (!player.hasPremium()) {
                text.content = text.content.replace(/~/g, '');
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
