import * as alt from 'alt';
import * as game from 'natives';
import { ClothesEnum } from 'client/modules/Enum/ClothesEnum';
import { Animation } from '../Utilities/Animation';


export default async() => {

    const player = alt.Player.local;

    alt.onServer('item:takeOffClothes', takeOffClothes);
    alt.onServer('item:equipClothes', equipClothes);

    const animationHat = new Animation('missheistdockssetup1hardhat@', 'put_on_hat', 500);
    animationHat.loadAnimDictAsync();
    const animationLegs = new Animation('clothingtrousers', 'try_trousers_neutral_c', 500);
    animationLegs.loadAnimDictAsync();
    const animationShoes = new Animation('clothingshoes', 'try_shoes_positive_d', 500);
    animationShoes.loadAnimDictAsync();
    const animationTop = new Animation('clothingshirt', 'try_shirt_positive_a', 500);
    animationTop.loadAnimDictAsync();


    async function takeOffClothes(componentID: number) {
        // TODO: Dorobić animacje
        // game.setPedComponentVariation(player.scriptID, componentID, 0, 0, 0);

        switch (componentID) {
            case ClothesEnum.Hat:
                animationHat.playAnim();
                game.clearPedProp(player.scriptID, 0);
                break;
            case ClothesEnum.Legs:
                animationLegs.playAnim();
                game.setPedComponentVariation(player.scriptID, ClothesEnum.Legs, 21, 0, 0);
                break;
            case ClothesEnum.Shoes:
                animationShoes.playAnim();
                    game.setPedComponentVariation(player.scriptID, ClothesEnum.Shoes, 34, 0, 0);
                    break;
            case ClothesEnum.Undershirt:
                animationTop.playAnim();
                game.setPedComponentVariation(player.scriptID, ClothesEnum.Torso, 15, 0, 0);
                game.setPedComponentVariation(player.scriptID, ClothesEnum.Undershirt, 15, 0, 0);
                break;
            case ClothesEnum.Top:
                animationTop.playAnim();
                game.setPedComponentVariation(player.scriptID, ClothesEnum.Torso, 15, 0, 0);
                game.setPedComponentVariation(player.scriptID, ClothesEnum.Top, 15, 0, 0);
                // game.setPedComponentVariation(player.scriptID, ClothesEnum.Torso, 15, 0, 0);
                // game.setPedComponentVariation(player.scriptID, ClothesEnum.Undershirt, 15, 0, 0);
                break;
            default:
                break;
        }
    }

    async function equipClothes(componentID: number, drawableID: number, textureID: number, torsoId: number, torsoTesture: number) {
        alt.log('wykonuje się bez switcha');
        alt.log(`componentID: ${componentID}`);
        // TODO: Dorobić teksture
        switch (componentID) {
            case ClothesEnum.Hat:
                animationHat.playAnim();
                game.setPedPropIndex(player.scriptID, 0, drawableID, textureID, false);
                break;
            case ClothesEnum.Legs:
                animationLegs.playAnim();
                game.setPedComponentVariation(player.scriptID, componentID, drawableID, textureID, 0);
                break;
            case ClothesEnum.Shoes:
                animationShoes.playAnim();
                game.setPedComponentVariation(player.scriptID, componentID, drawableID, textureID, 0);
                break;
            case ClothesEnum.Undershirt:
                animationTop.playAnim();
                game.setPedComponentVariation(player.scriptID, ClothesEnum.Torso, torsoId, torsoTesture, 0);
                game.setPedComponentVariation(player.scriptID, componentID, drawableID, textureID, 0);
                break;
            case ClothesEnum.Top:
                alt.log('wykonuje zmiane topu');
                animationTop.playAnim();
                game.setPedComponentVariation(player.scriptID, ClothesEnum.Torso, torsoId, torsoTesture, 0);
                game.setPedComponentVariation(player.scriptID, componentID, drawableID, textureID, 0);
                break;

            default:
                break;
        }
    }
};
