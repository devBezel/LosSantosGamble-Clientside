import * as alt from 'alt';
import { DrawText } from 'client/modules/Models/drawText';
import { Draw } from '../Utilities/Draw';

export default async () => {

    const draws: DrawText[] = [];

    alt.onServer('drawText:create', drawTextCreate);
    alt.onServer('drawText:remove', drawTextRemove);

    async function drawTextCreate(drawModel: DrawText) {
        draws.push(drawModel);
    }

    async function drawTextRemove(uniqueID: string) {
        const markerToRemove = draws.findIndex(draw => draw.uniqueID === uniqueID);
        alt.log(`usuwam textdraw ${markerToRemove}`);
        draws.splice(markerToRemove, 1);
    }

    alt.setInterval(() => {
        const playerDimension = alt.Player.local.getSyncedMeta('player:dimension');
        for (let i = 0; i < draws.length; i++) {
            if (playerDimension === draws[i].dimension) {
                Draw.draw3dText(draws[i].x, draws[i].y, draws[i].z, draws[i].text);
            }
        }
    },              2);

};


