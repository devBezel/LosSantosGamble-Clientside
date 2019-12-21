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

        // Legs
        game.setPedComponentVariation(alt.Player.local.scriptID, 4, characterLook.legsId, characterLook.legsTexture, 0);
        // Shoes
        game.setPedComponentVariation(alt.Player.local.scriptID, 6, characterLook.shoesId, characterLook.shoesTexture, 0);

        // Torso
        game.setPedComponentVariation(alt.Player.local.scriptID, 3, characterLook.torsoId, characterLook.torsoTexture, 0);
        // Undershirt
        game.setPedComponentVariation(alt.Player.local.scriptID, 8, characterLook.undershirtId, characterLook.undershirtTexture, 0);
        // Top
        game.setPedComponentVariation(alt.Player.local.scriptID, 11, characterLook.topId, characterLook.topTexture, 0);

        // Hat
        game.setPedPropIndex(alt.Player.local.scriptID, 0, characterLook.hatId, characterLook.hatTexture, false);
        // Glasses
        game.setPedPropIndex(alt.Player.local.scriptID, 1, characterLook.glassesId, characterLook.glassesTexture, false);
    }

    async function getNumberOfTextureVariation(componentId: number, componentIdTwo?: number, componentIdThree?: number, isProp: boolean = false) {
        const map = [];

        if (isProp) {
            for (let i = 0; i < game.getNumberOfPedPropDrawableVariations(alt.Player.local.scriptID, componentId); i++) {
                map.push({ index: i, variation: game.getNumberOfPedPropTextureVariations(alt.Player.local.scriptID, componentId, i) });
            }
            return webView.emit('characterCreator:clothesVariation', map);
        }
        alt.log('Wywoluje sie');
        for (let i = 0; i < game.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, componentId); i++) {
            map.push({ index: i, variation: game.getNumberOfPedTextureVariations(alt.Player.local.scriptID, componentId, i), component: componentId  });
        }

        if (componentIdTwo !== undefined || componentIdTwo !== null) {
            for (let i = 0; i < game.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, componentIdTwo); i++) {
                map.push({ index: i, variation: game.getNumberOfPedTextureVariations(alt.Player.local.scriptID, componentIdTwo, i), component: componentIdTwo  });
            }
        }

        if (componentIdThree !== undefined || componentIdThree !== null) {
            for (let i = 0; i < game.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, componentIdThree); i++) {
                map.push({ index: i, variation: game.getNumberOfPedTextureVariations(alt.Player.local.scriptID, componentIdThree, i), component: componentIdThree });
            }
        }

        webView.emit('characterCreator:clothesVariation', map);
    }

    // async function getComponentVariations(componentId: number, clothesLength: number) {
    //     // const clothesVariation = getNumberOfTextureVariation(componentId, clothesLength);
    //     // alt.log(`ze skryptu ${clothesVariation.index}`);
    //     getNumberOfTextureVariation(componentId, clothesLength).then((data: any) => {
    //         webView.emit('characterCreator:clothesVariation', data);
    //     });
    // }


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
        webView.on('cef:characterCreatorGetComponentsVariation', getNumberOfTextureVariation);
    }
};
