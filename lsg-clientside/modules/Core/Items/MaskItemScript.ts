import * as alt from 'alt';
import * as game from 'natives';

export default async () => {

    alt.onServer('item:maskEquip', maskEquip);
    alt.onServer('item:maskHide', maskHide);


    async function maskEquip(maskId: number) {
        // TODO: animacja zakładania maski
        game.setPedComponentVariation(alt.Player.local.scriptID, 1, maskId, 0, 0);
    }

    async function maskHide() {
        // TODO: Animacja zdejmowania maski
        game.setPedComponentVariation(alt.Player.local.scriptID, 1, 0, 0, 0);
    }
};
