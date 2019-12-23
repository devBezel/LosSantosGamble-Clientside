import * as alt from 'alt';
import * as game from 'natives';
import { View } from '../../Utilities/View';
import { Key } from 'client/modules/Constant/Keys/Key';
import { Player } from '../../Entities/Player';
import { CharacterLook } from 'client/modules/Models/characterLook';

export default async () => {

    let webView: View;
    let blockAfkCameraInterval: any;

    const url = 'http://localhost:4000/character/creator';


    alt.on('keyup', (key: any) => {
        if (key === Key.INSERT) {
            showCreationWindow();
        } else if (key === Key.ESCAPE) {
            alt.clearInterval(blockAfkCameraInterval);
            webView.close();
        }
    });

    async function randomClothes() {
        const playerId = alt.Player.local.scriptID;
        game.setPedRandomComponentVariation(playerId, 1);
    }

    async function clearClothes() {
        for (let i = 0; i < 18; i++) {
            game.setPedFaceFeature(alt.Player.local.scriptID, i, 0);
        }
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



        // Face detail
        game.setPedFaceFeature(alt.Player.local.scriptID, 0, characterLook.noseWidth);
        game.setPedFaceFeature(alt.Player.local.scriptID, 1, characterLook.nosePeakHight);
        game.setPedFaceFeature(alt.Player.local.scriptID, 2, characterLook.nosePeakLenght);
        game.setPedFaceFeature(alt.Player.local.scriptID, 3, characterLook.noseBoneHigh);
        game.setPedFaceFeature(alt.Player.local.scriptID, 4, characterLook.nosePeakLowering);
        game.setPedFaceFeature(alt.Player.local.scriptID, 5, characterLook.noseBoneTwist);
        game.setPedFaceFeature(alt.Player.local.scriptID, 6, characterLook.eyeBrownHigh);
        game.setPedFaceFeature(alt.Player.local.scriptID, 7, characterLook.eyeBrownForward);
        game.setPedFaceFeature(alt.Player.local.scriptID, 8, characterLook.cheeksBoneHigh);
        game.setPedFaceFeature(alt.Player.local.scriptID, 9, characterLook.cheeksBoneWidth);
        game.setPedFaceFeature(alt.Player.local.scriptID, 10, characterLook.cheeksWidth);
        game.setPedFaceFeature(alt.Player.local.scriptID, 11, characterLook.eyesOpenning);
        game.setPedFaceFeature(alt.Player.local.scriptID, 12, characterLook.lipsThickness);
        game.setPedFaceFeature(alt.Player.local.scriptID, 13, characterLook.jawBoneBackLenght);
        game.setPedFaceFeature(alt.Player.local.scriptID, 14, characterLook.chimpBoneLenght);
        game.setPedFaceFeature(alt.Player.local.scriptID, 15, characterLook.chimpBoneWidth);
        game.setPedFaceFeature(alt.Player.local.scriptID, 16, characterLook.chimpHole);
        game.setPedFaceFeature(alt.Player.local.scriptID, 18, characterLook.neckThikness);

        // Ears
        game.setPedEyeColor(alt.Player.local.scriptID, characterLook.earsColor);
        // Eyebrows
        game.setPedHeadOverlay(alt.Player.local.scriptID, 2, characterLook.eyebrowsId, characterLook.eyeBrowsOpacity);
        game.setPedHeadOverlayColor(alt.Player.local.scriptID, 2, 1, characterLook.firstEyebrowsColor, characterLook.secondEyebrowsColor);

        // Blemishes
        game.setPedHeadOverlay(alt.Player.local.scriptID, 0, characterLook.blemishesId, characterLook.blemishesOpacity);
        // Ageing
        game.setPedHeadOverlay(alt.Player.local.scriptID, 3, characterLook.ageingId, characterLook.ageingOpacity);
        // Makeup
        game.setPedHeadOverlay(alt.Player.local.scriptID, 4, characterLook.makeupId, characterLook.makeupOpacity);
        game.setPedHeadOverlayColor(alt.Player.local.scriptID, 4, 2, characterLook.firstMakeupColor, characterLook.secondMakeupColor);

        // blush
        game.setPedHeadOverlay(alt.Player.local.scriptID, 5, characterLook.blushId, characterLook.blushOpacity);
        game.setPedHeadOverlayColor(alt.Player.local.scriptID, 5, 1, characterLook.blushColor, characterLook.blushColor);

        // lipstick
        game.setPedHeadOverlay(alt.Player.local.scriptID, 8, characterLook.lipstickId, characterLook.lipstickOpacity);
        game.setPedHeadOverlayColor(alt.Player.local.scriptID, 8, 1, characterLook.firstLipstickColor, characterLook.secondLipstickColor);

        // Beard
        game.setPedHeadOverlay(alt.Player.local.scriptID, 1, characterLook.beardId, characterLook.beardOpacity);
        game.setPedHeadOverlayColor(alt.Player.local.scriptID, 1, 1, characterLook.beardColor, characterLook.beardColor);
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

        blockAfkCameraInterval = alt.setInterval(() => {
            game.invalidateIdleCam();
        },                                       10000);

        webView.on('cef:characterCreatorRandomClothes', randomClothes);
        webView.on('cef:characterCreatorClearClothes', clearClothes);
        webView.on('cef:characterCreatorChangeRotation', changeCharacterRotation);
        webView.on('cef:characterCreatorUpdateClothes', updateClothes);
        webView.on('cef:characterCreatorGetComponentsVariation', getNumberOfTextureVariation);
    }
};
