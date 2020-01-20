import * as alt from 'alt';
import * as game from 'natives';
import { Draw } from '../../Utilities/Draw';


export default async () => {

    const player = alt.Player.local;



    const streetInterval = alt.setInterval(() => {
        if (!player.isReady()) return;

        const streetObject = game.getStreetNameAtCoord(player.pos.x, player.pos.y, player.pos.z, 0, 0);
        const streetReady = game.getStreetNameFromHashKey(streetObject[1]);
        const district = game.getLabelText(game.getNameOfZone(player.pos.x, player.pos.y, player.pos.z));
        const date = new Date();


        const getHours = date.getHours();
        const getMinutes = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        Draw.drawTextConstant(0.633 - 0.0695 , 1.432 - 0.12, 1.0, 1.0, 0.3, `${district} ${streetReady}`, 255, 255, 255, 255);

        Draw.drawTextConstant(0.633 - 0.0075 , 1.432, 1.0, 1.0, 0.3, `~g~${getHours}:${getMinutes}     ${date.toLocaleDateString()}`, 255, 255, 255, 255);

    },                                     2);
};
