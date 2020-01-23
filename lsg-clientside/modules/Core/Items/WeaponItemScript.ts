import * as alt from 'alt';
import * as game from 'natives';
import { weaponItemConfig } from 'client/modules/Configs/Items/WeaponItemConfig';
import { Animation } from '../Utilities/Animation';


export default async () => {
    const player = alt.Player.local;

    // alt.onServer('item:weapon-ammo', getWeaponAmmo);
    alt.onServer('item:weaponTakeOut', weaponTakeOut);
    alt.onServer('item:weaponHide', weaponHide);

    // async function getWeaponAmmo(hash: number) {
    //     alt.emitServer('item:weapon-ammo', game.getAmmoInPedWeapon(player.scriptID, hash));
    // }

    async function weaponTakeOut(weaponHash: number) {
        alt.log(weaponHash);
        for (let i = 0; i < weaponItemConfig.weaponTakeOutAnims.length; i++) {
            if (weaponItemConfig.weaponTakeOutAnims[i].Hash === weaponHash) {

                const anim = new Animation(weaponItemConfig.weaponTakeOutAnims[i].AnimDict, weaponItemConfig.weaponTakeOutAnims[i].Anim, weaponItemConfig.weaponTakeOutAnims[i].Time);
                anim.loadAnimDictAsync();
                anim.playAnim();

                break;
            }
        }
    }

    async function weaponHide(weaponHash: number) {
        for (let i = 0; i < weaponItemConfig.weaponHideAnims.length; i++) {
            if (weaponItemConfig.weaponHideAnims[i].Hash === weaponHash) {

                const anim = new Animation(weaponItemConfig.weaponHideAnims[i].AnimDict, weaponItemConfig.weaponHideAnims[i].Anim, weaponItemConfig.weaponHideAnims[i].Time);
                anim.loadAnimDictAsync();
                anim.playAnim();

                break;
            }
        }
    }
};
