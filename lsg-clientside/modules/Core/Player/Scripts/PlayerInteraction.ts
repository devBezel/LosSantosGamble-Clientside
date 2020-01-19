import * as alt from 'alt';
import { Key } from 'client/modules/Constant/Keys/Key';

export default async () => {

    alt.on('keyup', async(key: any) => {
        if (key === Key.F10) {
            // Podpiąc do pózniej pod panel interakcji
            alt.emit('player-interaction:help');
        }
    });

};
