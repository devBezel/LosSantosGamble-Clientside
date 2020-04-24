import * as alt from 'alt';
import * as game from 'natives';
import { View } from 'client/modules/Core/Utilities/View';
import { Group } from 'client/modules/Models/group';
import { Key } from 'client/modules/Constant/Keys/Key';
import { GroupWorker } from 'client/modules/Models/groupWorker';
import { Vehicle } from 'client/modules/Models/vehicle';
import { Item } from 'client/modules/Models/Item';

export default async () => {

    const player = alt.Player.local;
    let webView: View;

    let disableControlsCuffInterval: number;

    alt.on('keyup', async (key: any) => {
        if (key === Key.ESCAPE) {
            if (webView === null || webView === undefined) {
                return;
            }
            webView.close();
        }
    });


    alt.onServer('group-general:openGroupPanel', openGroupPanel);

    async function openGroupPanel(group: Group, workers: GroupWorker[], vehicles: Vehicle[], worker: GroupWorker, slot: number) {
        if (!webView) {
            webView = new View();
        }
        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open('', true, 'group/panel', true);

        webView.emit('group-general:dataGroup', { group, workers, vehicles, worker, slot });
        webView.on('cef:vehicleSpawn', respawnGroupVehicle);
        webView.on('group:changeWorkerRights', changeWorkerRights);
    }

    async function respawnGroupVehicle(vehicleId: number) {
        alt.emitServer('vehicle:spawnVehicle', vehicleId);
    }

    async function changeWorkerRights(characterId: number, characterRights: number, groupSlot: number) {
        alt.emitServer('group:changeWorkerRights', characterId, characterRights, groupSlot);
    }

    alt.onServer('group:searchPlayer', searchPlayer);
    async function searchPlayer(items: Item[]) {
        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;
        webView.open('', true, 'search/entity', true);
        webView.emit('group:searchPlayer', items);
        webView.on('group:confiscatePlayerItem', confiscatePlayerItem);
    }

    async function confiscatePlayerItem(item: Item) {
        alt.emitServer('group:confiscatePlayerItem', JSON.stringify(item));
    }

    alt.onServer('group:cuffPlayer', cuffPlayer);
    async function cuffPlayer() {

        game.setEnableHandcuffs(player.scriptID, true);
        game.disablePlayerFiring(player.scriptID, true);
        game.setPedCanPlayGestureAnims(player.scriptID, false);
        game.freezeEntityPosition(player.scriptID, true);

        disableControlsCuffInterval = alt.setInterval(() => {
            game.disableControlAction(0, 1, true);  // Disable pan
			game.disableControlAction(0, 2, true); // Disable tilt
			game.disableControlAction(0, 24, true); // Attack
			game.disableControlAction(0, 257, true); // Attack 2
			game.disableControlAction(0, 25, true); // Aim
			game.disableControlAction(0, 263, true); // Melee Attack 1
			game.disableControlAction(0, 32, true); // W
			game.disableControlAction(0, 34, true); // A
			game.disableControlAction(0, 31, true); // S

			game.disableControlAction(0, 45, true); // Reload
			game.disableControlAction(0, 22, true); // Jump
			game.disableControlAction(0, 44, true); // Cover
			game.disableControlAction(0, 37, true); // Select Weapon
			game.disableControlAction(0, 23, true); // Also 'enter'?
			game.disableControlAction(0, 288,  true); // Disable phone
			game.disableControlAction(0, 289, true); // Inventory
			game.disableControlAction(0, 170, true); // Animations
			game.disableControlAction(0, 167, true); // Job
			game.disableControlAction(0, 0, true); // Disable changing view
			game.disableControlAction(0, 26, true); // Disable looking behind
			game.disableControlAction(0, 73, true); // Disable clearing animation
            game.disableControlAction(2, 199, true); // Disable pause screen

			game.disableControlAction(0, 59, true); // Disable steering in vehicle
			game.disableControlAction(0, 71, true); // Disable driving forward in vehicle
			game.disableControlAction(0, 72, true); // Disable reversing in vehicle
            game.disableControlAction(2, 36, true); // Disable going stealth

			game.disableControlAction(0, 47, true);  // Disable weapon
			game.disableControlAction(0, 264, true); // Disable melee
			game.disableControlAction(0, 257, true); // Disable melee
			game.disableControlAction(0, 140, true); // Disable melee
			game.disableControlAction(0, 141, true); // Disable melee
			game.disableControlAction(0, 142, true); // Disable melee
			game.disableControlAction(0, 143, true); // Disable melee
			game.disableControlAction(0, 75, true); // Disable exit vehicle
			game.disableControlAction(27, 75, true); // Disable exit vehicle
        },                                            2);
    }

    alt.onServer('group:uncuffPlayer', uncuffPlayer);
    async function uncuffPlayer() {

        game.setEnableHandcuffs(player.scriptID, false);
        game.disablePlayerFiring(player.scriptID, false);
        game.setPedCanPlayGestureAnims(player.scriptID, true);
        game.freezeEntityPosition(player.scriptID, false);

        if (disableControlsCuffInterval !== undefined) {
            alt.clearInterval(disableControlsCuffInterval);
        }
    }

    alt.onServer('group:dragPlayer', dragPlayer);
    async function dragPlayer(entityId: number) {
        const playerToDrag: alt.Player = alt.Player.all.find(x => x.id === entityId);

        if (playerToDrag.scriptID === player.scriptID) {
            return;
        }

        if (game.doesEntityExist(playerToDrag.scriptID) && game.isPedOnFoot(playerToDrag.scriptID)) {
            game.attachEntityToEntity(playerToDrag.scriptID, player.scriptID, game.getPedBoneIndex(player.scriptID, 28422), 0.1, 0.11, 0, 0, 270, -20, false, false, true, true, 2, true);
        }
    }

    alt.onServer('group:undragPlayer', undragPlayer);
    async function undragPlayer() {
        game.detachEntity(player.scriptID, true, false);
    }
};
