import * as alt from 'alt';
import * as game from 'natives';
import { View } from '../../Utilities/View';
import { Key } from 'client/modules/Constant/Keys/Key';
import { CharacterHair } from 'client/modules/Models/characterHair';
import { CharacterFace } from 'client/modules/Models/characterFace';

export default async () => {
    const characterFace: CharacterFace = new CharacterFace();


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

    async function changeCharacterHair(characterHair: CharacterHair) {
        updateComponentVariation(2, characterHair.hairId, characterHair.colorId, 0);
        game.setPedHairColor(alt.Player.local.scriptID, characterHair.colorId, characterHair.colorId);
        game.setPedHeadOverlayColor(alt.Player.local.scriptID, 1, 1, characterHair.colorId, characterHair.colorId);

    }

    async function changeCharacterFace(characterFace: CharacterFace) {
        alt.log(characterFace.shapeFirstID, characterFace.shapeSecondID, characterFace.shapeThirdID,
                characterFace.skinFirstID, characterFace.skinSecondID, characterFace.skinThirdID, characterFace.shapeMix, characterFace.skinMix, characterFace.thirdMix);
        game.setPedHeadBlendData(alt.Player.local.scriptID, characterFace.shapeFirstID, characterFace.shapeSecondID, characterFace.shapeThirdID,
                                 characterFace.skinFirstID, characterFace.skinSecondID, characterFace.skinThirdID, characterFace.shapeMix, characterFace.skinMix, characterFace.thirdMix, true);
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
        webView.on('cef:characterCreatorChangeHair', changeCharacterHair);
        webView.on('cef:characterCreatorChangeFace', changeCharacterFace);
    }
};
