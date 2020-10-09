import * as alt from 'alt';
import * as game from 'natives';
import { Calculation } from '../Utilities/Calculation';
import { Controls } from '../Utilities/Controls';
import { Key } from 'client/modules/Constant/Keys/Key';
import { View } from '../Utilities/View';
import { objStreamer } from '../../Streamers/ObjectSteamer/ObjectStreamer';
import { InteractionCef } from 'client/modules/Models/interactionCef';


export default async () => {

    const player = alt.Player.local;

    let itemID: number;
    let objectHash: number;

    let webView: View;
    let useObjectState: boolean = false;
    let drawLineInterval: number;
    let createdObject: number;
    const rotationObject: Vector3 = { x: 0, y: 0, z: 0 };

    const respawnedPlayerObjects: { objectID: number, itemID: number }[] = [];

    alt.onServer('item:useObject', useObiectItem);


    async function useObiectItem(itemId: number, objectId: number) {
        if (useObjectState) {
            return disposeUseObiect();
        }

        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;


        itemID = itemId;
        objectHash = objectId;

        webView.open('', true, 'object/editor/overlay', true);

        useObjectState = true;
        alt.showCursor(true);

        createdObject = game.createObject(objectId, player.pos.x, player.pos.y, player.pos.z , true, true, true);
        // Do debugowania
        alt.log(createdObject);


        game.setEntityCollision(createdObject, false, false);
        game.freezeEntityPosition(createdObject, true);


        game.setEntityVisible(player.scriptID, false, false);
        player.nicknameVisableOff(true);

        drawLineInterval = alt.setInterval(() => {

            // TODO: Dorobić żeby się kamera nie freezowala

            Controls.disableControls();

            Calculation.screen2dToWorld3dPosition(alt.getCursorPos().x, alt.getCursorPos().y, -1, player.scriptID, (result: any) => {

                const interactObjectPos: Vector3 = result[2];

                game.setEntityCoords(createdObject, interactObjectPos.x, interactObjectPos.y, interactObjectPos.z, false, false, false, false);
                game.setEntityRotation(createdObject, rotationObject.x, rotationObject.y, rotationObject.z, 0, false);

            });
        },                                 1);
    }

    alt.on('keyup', async (key: any) => {
        if (useObjectState) {
            switch (key) {
                case Key.UP: return rotationObject.x -= 2;
                case Key.DOWN: return rotationObject.x += 2;
                case Key.LEFT: return rotationObject.y -= 2;
                case Key.RIGHT: return rotationObject.y += 2;
                case Key.E: return createDynamicWorldObject();
                case Key.ESCAPE: return disposeUseObiect();
                default:
                    break;
            }
        }
    });


    async function disposeUseObiect(cancelItemUse: boolean = true) {

        if (webView) {
            webView.close();
        }

        useObjectState = false;
        alt.showCursor(false);

        alt.clearInterval(drawLineInterval);
        game.deleteObject(createdObject);

        game.setEntityVisible(player.scriptID, true, false);
        player.nicknameVisableOff(false);

        if (cancelItemUse) {
            alt.emitServer('item:cancelUseObject', itemID);
        }
    }

    async function createDynamicWorldObject() {
        alt.emitServer('item:createWorldObject', objectHash, JSON.stringify(game.getEntityCoords(createdObject, true)), JSON.stringify(rotationObject), itemID);

        disposeUseObiect(false);
    }


    alt.on('interaction2D:object', objectInteractionMenu);
    async function objectInteractionMenu(objectId: number) {
        if (objectId === undefined) {
            return;
        }

        const interactionData: InteractionCef[] = [
            {
                name: 'Informacje o obiekcie',
                event: 'item:informationWorldObject',
                icon: 'search',
            },
            {
                name: 'Edytuj obiekt',
                event: 'item:editWorldObject',
                icon: 'settings',
            },
            {
                name: 'Usuń obiekt',
                event: 'item:removeWorldObject',
                icon: 'delete',
                values: { value1: objectId },
            },
        ];

        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open('', true, 'interaction/menu', false);
        webView.emit('interaction-menu:data', interactionData);
        webView.on('item:removeWorldObject', removeWorldObject);
    }

    async function removeWorldObject(values: { value1: any }) {

        if (webView) {
            webView.close();
        }

        const handleID: number = values.value1;

        const objOnWorld = objStreamer.getObjectByHandleId(handleID);


        const itemIDFromList: number = respawnedPlayerObjects.find(x => x.objectID === objOnWorld.entityId).itemID;

        // Usuwanie obiektu ze świata
        desynchornizateWorldObjectServer(handleID);
        alt.emitServer('item:removeWorldObject', objOnWorld.entityId, itemIDFromList);
    }

    alt.onServer('item:synchronizateWorldObjectWithClient', synchronizateWorldObjectServer);
    async function synchronizateWorldObjectServer(objectId: number, itemId: number) {
        respawnedPlayerObjects.push({ objectID: objectId, itemID: itemId });
    }


    async function desynchornizateWorldObjectServer(itemID: number) {
        respawnedPlayerObjects.splice(respawnedPlayerObjects.findIndex(x => x.itemID === itemID), 1);
    }

};
