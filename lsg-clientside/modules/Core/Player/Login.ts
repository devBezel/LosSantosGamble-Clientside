import * as alt from 'alt';
import * as game from 'natives';
import { View } from '../Utilities/View';
import { Character } from 'client/modules/Models/character';
import { CharacterLook } from 'client/modules/Models/characterLook';
import { Camera } from '../Utilities/Camera';
import { spawnConfig } from 'client/modules/Configs/SpawnConfig';
import { baseConfig } from 'client/modules/Configs/BaseConfig';
import { NativeNotification } from '../Notify/NativeNotification';
import { nativeNotificationType } from 'client/modules/Constant/Notification/NativeNotificationType';
import { Environment } from '../Version/Environment';

export default async() => {

    let webView: View;
    let loginCamera: Camera = new Camera(3331.6, 5222.5, 23, 10);
    const url: string =  `${Environment.getUrl}login`;


    alt.onServer('other:first-connect', showLoginWindow);
    alt.onServer('character:wearClothes', wearCharacterClothes);
    alt.on('clothesScript:firstCharacterCustomizationCompleted', customizationCompleted);

    async function showLoginWindow() {
        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open(url, true);
        webView.on('cef:character-selected', characterDetails);

        loginCamera.pointAtCoord(3331.6, 5222.5, 23);
    }

    async function characterDetails(character: Character) {
        alt.Player.local.setMeta('character:data', character);
        webView.close();

        // alt.emitServer('login:characterDetail', JSON.stringify(character));
        alt.emitServer('login:characterDetail', character.id);
    }

    async function wearCharacterClothes(characterLook: CharacterLook) {

        if (characterLook === null || characterLook === undefined || characterLook.characterId === 0) {

            game.freezeEntityPosition(alt.Player.local.scriptID, true);
            game.setEntityCoords(alt.Player.local.scriptID, spawnConfig.customizationCharacterPosition.x, spawnConfig.customizationCharacterPosition.y, spawnConfig.customizationCharacterPosition.z, false, false, false, false);
            game.setEntityHeading(alt.Player.local.scriptID, 60);

            if (!loginCamera) {
                loginCamera = new Camera(-1420.18, 6754.73, 5.87549, 0);
            }

            loginCamera.position(spawnConfig.cameraPosition);
            loginCamera.fov(70);

            return alt.emit('character:showCreateCharacterWindow', true);
        }

        alt.Player.local.setPlayerReady(true);
        loginCamera.destroy();

        alt.emit('player:ready');
        return alt.emit('character:wearClothes', characterLook);
    }

    async function customizationCompleted() {
        loginCamera.destroy();
        alt.Player.local.setPlayerReady(true);


        NativeNotification.showNotification(null, nativeNotificationType.Normal, 0, 'Pomyślnie ubrałeś postać', '~g~ Przebieralnia', 'Twoja postać została ubrana poprawnie', 1);
        alt.emit('player:ready');
        alt.emitServer('login:successWearChangeWorld');
    }
};
