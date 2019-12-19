import * as alt from 'alt';
import * as game from 'natives';
import { View } from '../../Utilities/View';
import { Key } from 'client/modules/Constant/Keys/Key';
import { Player } from '../../Entities/Player';
import { CharacterLook } from 'client/modules/Models/characterLook';

export default async () => {

    let webView: View;
    const url = 'http://localhost:4000/character/creator';


    alt.on('keyup', (key: any) => {
        if (key === Key.INSERT) {
            showCreationWindow();
        } else if (key === Key.ESCAPE) {
            webView.close();
        }
    });

    async function updateComponentVariation(id: number, drawable: number, texture: number, isProp: any) {
        const playerId = alt.Player.local.scriptID;
        if (isProp) {
            game.setPedPropIndex(playerId, id, drawable, texture, true);

            if (drawable === -1) {
                game.clearPedProp(playerId, id);
            }
        }

        game.setPedComponentVariation(playerId, id, drawable, texture, 0);
    }

    async function randomClothes() {
        const playerId = alt.Player.local.scriptID;
        game.setPedRandomComponentVariation(playerId, 1);
    }

    async function clearClothes() {
        game.setPedDefaultComponentVariation(alt.Player.local.scriptID);
    }

    async function changeCharacterRotation(rot: number) {
        game.setEntityHeading(alt.Player.local.scriptID, rot);
    }

    async function updateClothes(characterLook: CharacterLook) {

        // DNA
        game.setPedHeadBlendData(alt.Player.local.scriptID, characterLook.fatherFaceId, characterLook.motherFaceId, 0, characterLook.skinColour, 0, 0, characterLook.shapeMix, 0, 0, true);

        // Hair
        game.setPedComponentVariation(alt.Player.local.scriptID, 2, characterLook.hairId, 0, 0);
        game.setPedHairColor(alt.Player.local.scriptID, characterLook.hairColor, characterLook.hairColorTwo);
    }


    async function showCreationWindow() {
        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open(url, true);

        webView.on('cef:characterCreatorRandomClothes', randomClothes);
        webView.on('cef:characterCreatorClearClothes', clearClothes);
        webView.on('cef:characterCreatorChangeRotation', changeCharacterRotation);
        webView.on('cef:characterCreatorUpdateClothes', updateClothes);
    }
};
