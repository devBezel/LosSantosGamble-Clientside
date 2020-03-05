import * as alt from 'alt';
import * as game from 'natives';
import { Calculation } from '../Utilities/Calculation';
import { Key } from 'client/modules/Constant/Keys/Key';
import { Draw } from '../Utilities/Draw';

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

            if (openMouse) {
                return disposeInteraction2D();
            }

            openMouse = true;
            alt.showCursor(true);

            drawLineInterval = alt.setInterval(() => {

                // game.disableAllControlActions(0);
                // game.disableAllControlActions(1);

                // game.enableControlAction(0, 1, true);

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

        if (interactObjectType === EntityType.vehicle) {
            disposeInteraction2D();

            alt.emit('interaction2D:vehicle', entity);
        }
    }

    function disposeInteraction2D() {
        openMouse = false;
        alt.clearInterval(drawLineInterval);
        alt.showCursor(false);
    }
};
