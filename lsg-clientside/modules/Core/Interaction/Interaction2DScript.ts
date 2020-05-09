import * as alt from 'alt';
import * as game from 'natives';
import { Calculation } from '../Utilities/Calculation';
import { Key } from 'client/modules/Constant/Keys/Key';
import { Draw } from '../Utilities/Draw';
import { Controls } from '../Utilities/Controls';
import { InteractionCef } from 'client/modules/Models/interactionCef';

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
                        // TODO: Dorobić marker
                        game.drawRect(0, 0, 0, 0, 0, 0, 0, 0, true);
                        game.drawMarker(0, interactObjectPos.x, interactObjectPos.y, interactObjectPos.z + 0.1, 0, 0, 0, 0, 0, 0, 0.15, 0.15, 0.15, 0, 153, 0, 100, false, false, 2, false, null, null, false);

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
                alt.emit('interaction2D:vehicle', entity);
                break;
            case EntityType.object:
                alt.emit('interaction2D:object', entity);
            case EntityType.ped:
                alt.log('Interakcja z graczem');
            default:
                break;
        }
        // sprawdzić czy to działa
        disposeInteraction2D();
    }

    function disposeInteraction2D() {
        openMouse = false;
        alt.clearInterval(drawLineInterval);
        alt.showCursor(false);
    }

};
