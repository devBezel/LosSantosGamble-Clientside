import * as alt from 'alt';
import * as game from 'natives';
import { Calculation } from '../Utilities/Calculation';
import { Key } from 'client/modules/Constant/Keys/Key';
import { Draw } from '../Utilities/Draw';
import { Controls } from '../Utilities/Controls';

export enum EntityType {
    noEntity,
    ped,
    vehicle,
    object,
}

export default async () => {

    let openMouse: boolean = false;
    const player: alt.Player = alt.Player.local;
    let drawLineInterval: number;

    alt.on('keyup', (key: any) => {
        if (key === Key.ALT) {

            if (player.getMeta('viewOpen')) return;
            if (alt.Player.local.getMeta('chatOpen')) return;

            if (player.vehicle) return;

            if (openMouse) {
                return disposeInteraction2D();
            }

            openMouse = true;
            alt.showCursor(true);

            drawLineInterval = alt.setInterval(() => {

                if (player.vehicle) {
                    return disposeInteraction2D();
                }

                Controls.disableControls();

                let drawLineColor: { r: number, g: number, b: number, a: number } = { r: 188, g: 0, b: 0, a: 255 };

                Calculation.screen2dToWorld3dPosition(alt.getCursorPos().x, alt.getCursorPos().y, -1, player.scriptID, (result: any) => {
                    const interactObjectPos: Vector3 = result[2];
                    const interactObject = result[4];

                    if (isInteractObject(interactObject)) {
                        drawLineColor = { r: 0, g: 131, b: 13, a: 255 };

                        if (game.isControlJustReleased(0, 24)) {
                            if (Calculation.isPlayerInRange(player.pos, interactObjectPos, 4)) {
                                interactObjectAction(interactObject);
                            }
                        }
                    }

                    if (!Calculation.isPlayerInRange(player.pos, interactObjectPos, 4)) {
                        Draw.draw3dText(interactObjectPos.x, interactObjectPos.y, interactObjectPos.z, 'Jesteś zbyt daleko');
                    }

                    game.drawLine(interactObjectPos.x, interactObjectPos.y, interactObjectPos.z, player.pos.x, player.pos.y, player.pos.z, drawLineColor.r, drawLineColor.g, drawLineColor.b, drawLineColor.a);
                });
            },                                 0);
        }
    });


    function isInteractObject(entity: number) {
        if (game.getEntityType(entity) === 0) {
            return false;
        }

        return true;
    }

    // Sending emits to scripts
    function interactObjectAction(entity: number) {
        const interactObjectType = game.getEntityType(entity);

        switch (interactObjectType) {
            case EntityType.vehicle:
                disposeInteraction2D();
                alt.emit('interaction2D:vehicle', entity);
                break;
            case EntityType.object:
                disposeInteraction2D();
                alt.emit('interaction2D:object', entity);
            case EntityType.ped:
                alt.log('Interakcja z graczem');
            default:
                break;
        }

        // if (interactObjectType === EntityType.vehicle) {

        //     disposeInteraction2D();
        //     alt.emit('interaction2D:vehicle', entity);

        // } else if (interactObjectType === EntityType.object) {
        //     disposeInteraction2D();
        //     alt.emit('interaction2D:object', entity);
        // }
    }

    function disposeInteraction2D() {
        openMouse = false;
        alt.clearInterval(drawLineInterval);
        alt.showCursor(false);
    }

    // function disableControls() {
    //     game.disableControlAction(0, 1, true);
    //     game.disableControlAction(0, 2, true);
    //     game.disableControlAction(0, 3, true);
    //     game.disableControlAction(0, 25, true);
    //     game.disableControlAction(0, 263, true);
    //     game.disableControlAction(0, 264, true);
    //     game.disableControlAction(0, 257, true);
    //     game.disableControlAction(0, 140, true);
    //     game.disableControlAction(0, 141, true);
    //     game.disableControlAction(0, 142, true);
    //     game.disableControlAction(0, 143, true);


    //     game.disableControlAction(0, 32, true);
    //     game.disableControlAction(0, 33, true);
    //     game.disableControlAction(0, 34, true);
    //     game.disableControlAction(0, 35, true);

    //     game.disableControlAction(0, 47, true);
    //     game.disableControlAction(0, 58, true);
    //     // game.disableControlAction(1, 1, true);
    // }
};
