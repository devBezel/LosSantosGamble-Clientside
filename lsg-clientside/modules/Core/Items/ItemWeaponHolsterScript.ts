import * as alt from 'alt';
import * as game from 'natives';



export default async() => {
    const player = alt.Player.local;

    alt.onServer('item:weaponHolsterTakeOut', weaponHolsterTakeOut);
    alt.onServer('item:weaponHolsterHide', weaponHolsterHide);

    async function weaponHolsterTakeOut(holsterObject: number) {
        game.setPedComponentVariation(player.scriptID, 8, holsterObject, 0, 0);
    }

    async function weaponHolsterHide(undershirtId: number, undershirtTexture: number) {

        game.setPedComponentVariation(player.scriptID, 8, undershirtId, undershirtTexture, 0);
    }
};
