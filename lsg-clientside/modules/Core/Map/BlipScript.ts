import * as alt from 'alt';
import * as game from 'natives';

export default async () => {
    const blips: any = new Map();
    let totalBlips = 0;

    alt.onServer('blip:create', createBlip);
    alt.onServer('blip:delete', deleteBlip);

    async function createBlip(posX: number, posY: number, posZ: number, sprite: number, color: number, scale: number, name: string, shortRange: boolean, uniqueID: any) {
        alt.log(`tworze blip UniqueID: ${uniqueID}`);
        const blip = game.addBlipForCoord(posX, posY, posZ);
        game.setBlipSprite(blip, sprite);
        game.setBlipColour(blip, color);
        game.setBlipScale(blip, scale);
        game.setBlipAsShortRange(blip, shortRange);
        game.beginTextCommandSetBlipName('STRING');
        game.addTextComponentSubstringPlayerName(name);
        game.endTextCommandSetBlipName(blip);

        if (uniqueID === undefined || uniqueID === null) {
            totalBlips += 1;
            // tslint:disable-next-line:no-parameter-reassignment
            uniqueID = `${totalBlips}`;
        }

        if (blips[uniqueID] !== undefined) {
            game.removeBlip(blip);
        }

        blips[uniqueID] = blip;
    }

    async function deleteBlip(uniqueID: string) {
        if (blips[uniqueID] !== undefined) {
            alt.log(blips);
            game.removeBlip(blips[uniqueID]);
            blips.delete(uniqueID);
            alt.log(blips);
        }
    }
};
