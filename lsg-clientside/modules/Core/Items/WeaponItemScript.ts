import * as alt from 'alt';
import * as game from 'natives';
import { weaponItemConfig } from 'client/modules/Configs/Items/WeaponItemConfig';
import { Animation } from '../Utilities/Animation';


export default async () => {
    const player = alt.Player.local;

    // alt.onServer('item:weapon-ammo', getWeaponAmmo);
    alt.onServer('item:weaponTakeOut', weaponTakeOutEvent);
    alt.onServer('item:weaponHide', weaponHideEvent);

    // async function getWeaponAmmo(hash: number) {
    //     alt.emitServer('item:weapon-ammo', game.getAmmoInPedWeapon(player.scriptID, hash));
    // }

    async function weaponTakeOutEvent(weaponHash: number, hasWeaponHolster: boolean) {
        const resultWeapon = await checkWeapon(weaponHash);
        if (!resultWeapon) return;

        if (hasWeaponHolster) {
            weaponTakeOutWithHolster(resultWeapon);

            return;
        }

        weaponTakeOutWithoutHolster(resultWeapon);

    }

    async function weaponHideEvent(weaponHash: number, hasWeaponHolster: boolean) {
        const resultWeapon = await checkWeapon(weaponHash);
        if (!resultWeapon) return;

        if (hasWeaponHolster) {
            weaponHideWithHolster(resultWeapon);

            return;
        }

        weaponHideWithoutHolster(resultWeapon);
    }


    async function weaponTakeOutWithHolster(weaponIndex: number) {
        const anim = new Animation(weaponItemConfig.weaponTakeOutAnims[weaponIndex].WithWeaponHolster.AnimDict, weaponItemConfig.weaponTakeOutAnims[weaponIndex].WithWeaponHolster.Anim, weaponItemConfig.weaponTakeOutAnims[weaponIndex].WithWeaponHolster.Time);
        anim.loadAnimDictAsync();
        anim.playAnim();
    }

    async function weaponHideWithHolster(weaponIndex: number) {
        const anim = new Animation(weaponItemConfig.weaponHideAnims[weaponIndex].WithWeaponHolster.AnimDict, weaponItemConfig.weaponHideAnims[weaponIndex].WithWeaponHolster.Anim, weaponItemConfig.weaponHideAnims[weaponIndex].WithWeaponHolster.Time);
        anim.loadAnimDictAsync();
        anim.playAnim();
    }


    async function weaponTakeOutWithoutHolster(weaponIndex: number) {
        const anim = new Animation(weaponItemConfig.weaponTakeOutAnims[weaponIndex].WithoutWeaponHolster.AnimDict,
                                   weaponItemConfig.weaponTakeOutAnims[weaponIndex].WithoutWeaponHolster.Anim, weaponItemConfig.weaponTakeOutAnims[weaponIndex].WithoutWeaponHolster.Time);
        anim.loadAnimDictAsync();
        anim.playAnim();
    }

    async function weaponHideWithoutHolster(weaponIndex: number) {
        const anim = new Animation(weaponItemConfig.weaponHideAnims[weaponIndex].WithoutWeaponHolster.AnimDict,
                                   weaponItemConfig.weaponHideAnims[weaponIndex].WithoutWeaponHolster.Anim, weaponItemConfig.weaponHideAnims[weaponIndex].WithoutWeaponHolster.Time);
        anim.loadAnimDictAsync();
        anim.playAnim();
    }

    async function checkWeapon(weaponHash: number) {
        for (let i = 0; i < weaponItemConfig.weaponTakeOutAnims.length; i++) {
            if (weaponItemConfig.weaponTakeOutAnims[i].Hash === weaponHash) {
                return i;
            }
        }

        return false;
    }
};
