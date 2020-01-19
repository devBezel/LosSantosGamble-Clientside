import * as alt from 'alt';
import { Key } from 'client/modules/Constant/Keys/Key';

export default async () => {

    // Testowa rzecz
    alt.onServer('player:help', async () => {
        alt.emit('player-interaction:help');
    });

};
