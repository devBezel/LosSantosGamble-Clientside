import * as alt from 'alt';
import * as game from 'natives';
import { Animation } from '../Utilities/Animation';

export default async () => {

    const animation = new Animation('mp_masks@standard_car@rds@', 'put_on_mask', 100);
    animation.loadAnimDictAsync();

    alt.onServer('item:maskEquip', maskEquip);
    alt.onServer('item:maskHide', maskHide);


    async function maskEquip(maskId: number) {
        // TODO: animacja zakładania maski
        animation.playAnim();
        game.setPedComponentVariation(alt.Player.local.scriptID, 1, maskId, 0, 0);
    }

    async function maskHide() {
        // TODO: Animacja zdejmowania maski
        animation.playAnim();
        game.setPedComponentVariation(alt.Player.local.scriptID, 1, 0, 0, 0);
    }
};
