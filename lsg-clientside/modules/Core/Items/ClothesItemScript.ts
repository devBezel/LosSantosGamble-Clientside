import * as alt from 'alt';
import * as game from 'natives';
import { ClothesEnum } from 'client/modules/Enum/ClothesEnum';


export default async() => {

    const player = alt.Player.local;

    alt.onServer('item:takeOffClothes', takeOffClothes);
    alt.onServer('item:equipClothes', equipClothes);

    async function takeOffClothes(componentID: number) {
        // TODO: Dorobić animacje
        // game.setPedComponentVariation(player.scriptID, componentID, 0, 0, 0);

        switch (componentID) {
            case ClothesEnum.Top:
                game.setPedComponentVariation(player.scriptID, ClothesEnum.Top, 15, 0, 0);
                game.setPedComponentVariation(player.scriptID, ClothesEnum.Torso, 15, 0, 0);
                game.setPedComponentVariation(player.scriptID, ClothesEnum.Undershirt, 15, 0, 0);
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
            case ClothesEnum.Top:
                alt.log('wykonuje zmiane topu');
                game.setPedComponentVariation(player.scriptID, ClothesEnum.Torso, torsoId, torsoTesture, 0);
                game.setPedComponentVariation(player.scriptID, componentID, drawableID, textureID, 0);
                break;

            default:
                break;
        }
    }
};
