import * as alt from 'alt';
import * as game from 'natives';
import { Position } from '../../Utilities/Position';
import { Player } from '../../Entities/Player';
import { Draw } from '../../Utilities/Draw';
import { RankParser } from '../../Helpers/RankParser';

export default async () => {
    alt.setInterval(async () => {
        alt.Player.all.forEach((player: alt.Player) => {

            if (player.getMeta('scaleform:nicknameTurnOff')) return;

            const serverID = player.getSyncedMeta('account:id');
            const onAdminDuty = player.getSyncedMeta('admin:setDuty');
            const hasPremium = player.getSyncedMeta('account:hasPremium');
            const accountData = player.getSyncedMeta('account:dataAccount');
            const characterData = player.getSyncedMeta('character:dataCharacter');
            const isAfk = player.getSyncedMeta('player:afk');

            const characterName = player.getSyncedMeta('character:name');

            const distanceFromLocal = Position.distance(player.pos, alt.Player.local.pos);
            if (distanceFromLocal >= 10) {
                return;
            }

            const result = game.getScreenCoordFromWorldCoord(player.pos.x, player.pos.y, player.pos.z + 1.0, undefined, undefined);

            if (!result[0]) {
                return;
            }

            let y = result[2];  // - yMofidier;

            if (y <= 0) {
                y = 0;
            }

            let username: string;

            if (onAdminDuty && hasPremium && characterData.name) {
                username = `(${RankParser.parse(accountData.rank)}) ~y~ ${accountData.username} (${serverID})`;
            } else if (onAdminDuty) {
                username = `(${RankParser.parse(accountData.rank)}) ${accountData.username} (${serverID})`;
            } else if (hasPremium) {
                username = `~y~ ${characterName} (${serverID})`;
            } else {
                username = `${characterName} (${serverID})`;
            }

            if (isAfk) {
                username += ' (~g~AFK~s~)';
            }

            Draw.drawText(username, result[1], y, 0.3, 6, 255, 255, 255, 255, false, false);


            let text = Player.getPlayerDescription(player);

            if (text === null || text === undefined) {
                return;
            }
            if (!hasPremium) {

                if (text === null || text === undefined) return;

                text = text.replace(/~/g, '');
            }

            const textOne = text.slice(0, 64);
            const textTwo = text.slice(64, 128);
            const textThree = text.slice(128, 192);

            if (text.length > 0) {
                const desc = game.getScreenCoordFromWorldCoord(player.pos.x, player.pos.y, player.pos.z + 0.3, undefined, undefined);
                Draw.drawText(textOne, desc[1], desc[2], 0.2, 6, 255, 255, 255, 255, false, false);
            }
            if (text.length >= 64) {
                const desc = game.getScreenCoordFromWorldCoord(player.pos.x, player.pos.y, player.pos.z + 0.2, undefined, undefined);
                Draw.drawText(textTwo, desc[1], desc[2], 0.2, 6, 255, 255, 255, 255, false, false);
            }
            if (text.length >= 128) {
                const desc = game.getScreenCoordFromWorldCoord(player.pos.x, player.pos.y, player.pos.z + 0.1, undefined, undefined);
                Draw.drawText(textThree, desc[1], desc[2], 0.2, 6, 255, 255, 255, 255, false, false);
            }

        });
    },              0);
};
