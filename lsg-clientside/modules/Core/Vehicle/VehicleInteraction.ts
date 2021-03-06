import * as alt from 'alt';
import * as game from 'natives';
import { Key } from 'client/modules/Constant/Keys/Key';
import { View } from '../Utilities/View';
import { Vehicle } from 'client/modules/Models/vehicle';
import { Animation } from '../Utilities/Animation';
import { VehicleHelper } from './VehicleHelper';
import { Calculation } from '../Utilities/Calculation';
import { NativeNotification } from '../Notify/NativeNotification';
import { nativeNotificationType } from 'client/modules/Constant/Notification/NativeNotificationType';
import { VehicleDoor } from 'client/modules/Enum/VehicleDoor';
import { interactionConfig } from 'client/modules/Configs/InteractionConfig';

export default async () => {

    let webView: View;
    let vehicle: alt.Vehicle;
    let vehicleTransformData: Vehicle;
    const player = alt.Player.local;


    alt.onServer('player:enterVehicle', playerEnterVehicle);

    // alt.on('keyup', async (key: any) => {

    //     if (key === Key.ESCAPE) {
    //         if (webView === null || webView === undefined) {
    //             return;
    //         }
    //         webView.close();
    //     }
    // });

    enum doorLockState {
        Open = 1,
        Closed = 3,
    }

    alt.on('interaction2D:vehicle', async (vehicleScriptID: number) => {
        const vehicleRange = alt.Vehicle.all.find(x => x.scriptID === vehicleScriptID);

        if (vehicleRange === null || vehicleRange === undefined) return;
        if (player.vehicle != null) return;

        const vehicleData: Vehicle = vehicleRange.getSyncedMeta('vehicle:syncedData');

        if (vehicleData === null || vehicleData === undefined) return;

        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;
        vehicle = vehicleRange;
        vehicleTransformData = vehicleData;


        webView.open('', true, 'vehicle/interaction');
        webView.on('cef-vehicle-interaction:openVehicle', openDoorLockVehicle);
        webView.on('cef-vehicle-interaction:openDoor', openVehicleDoor);
    });

    alt.on('keyup', async (key: any) => {
        if (key === interactionConfig.interactionKeyIntoVehicle) {
            if (player.vehicle == null) return;

            const vehicleData: Vehicle = player.vehicle.getSyncedMeta('vehicle:syncedData');
            if (vehicleData === null || vehicleData === undefined) return;


            if (!webView) {
                webView = new View();
            }

            if (alt.Player.local.getMeta('viewOpen') || alt.Player.local.getMeta('chatOpen')) return;

            // Jeśli nie jest kierowcą
            if (game.getPedInVehicleSeat(player.vehicle.scriptID, -1, 1) !== player.scriptID) return;

            vehicleTransformData = vehicleData;

            webView.open('', true, 'vehicle/interaction/into', true);
            webView.on('cef-vehicle-interaction:turnEngine', turnVehicleEngine);
            webView.on('cef-vehicle-interaction:getVehicleInfo', getVehicleInfo);
        }
    });


    async function openDoorLockVehicle() {
        webView.close();

        if (vehicle.scriptID === null || vehicle.scriptID === undefined) return;

        if (!VehicleHelper.isVehicleOwner(vehicleTransformData, player)) {
            return NativeNotification.showNotification(null, nativeNotificationType.LockSystem, 0, 'Nie posiadasz kluczy', '~g~ Zamek centralny', 'Aby otworzyć ten pojazd musisz posiadać do niego klucze', 1);
        }

        const animation = new Animation('anim@mp_player_intmenu@key_fob@', 'fob_click_fp', 200);
        await animation.loadAnimDictAsync();

        if (game.getVehicleDoorLockStatus(vehicle.scriptID) !== doorLockState.Closed) {
            game.setVehicleDoorsLocked(vehicle.scriptID, 3);

            animation.playAnim();

            return NativeNotification.showNotification(null, nativeNotificationType.LockSystem, 0, 'Pojazd został zamknięty', '~g~ Zamek centralny', 'Twój pojazd zostal zamknięty', 1);
        }

        game.setVehicleDoorsLocked(vehicle.scriptID, 1);
        animation.playAnim();


        return NativeNotification.showNotification(null, nativeNotificationType.LockSystem, 0, 'Pojazd został otwarty', '~g~ Zamek centralny', 'Twój pojazd zostal otwarty', 1);
    }

    async function openVehicleDoor(door: number) {
        webView.close();

        if (vehicle.scriptID === null || vehicle.scriptID === undefined) return;

        if (VehicleHelper.isVehicleLocked(vehicle)) {
            return NativeNotification.showNotification(null, nativeNotificationType.LockSystem, 0, 'Ten pojazd jest zamknięty', '~g~ Zamek centralny', 'Aby wykonać tą operację musisz go otworzyć', 1);
        }

        if (VehicleHelper.isVehicleOwner(vehicleTransformData, player)) {

            if (VehicleHelper.isDoorOpen(vehicle, door)) {
                game.setVehicleDoorShut(vehicle.scriptID, door, false);
            } else {
                game.setVehicleDoorOpen(vehicle.scriptID, door, false, false);
            }

            if (door === VehicleDoor.Trunk && VehicleHelper.isTrunkOpenGetter(vehicle)) {
                VehicleHelper.isTrunkOpenSetter(vehicle, false);

                alt.emitServer('vehicle-interaction:closeTrunkRequest', vehicle);
            } else  if (door === VehicleDoor.Trunk && !VehicleHelper.isTrunkOpenGetter(vehicle)) {

                VehicleHelper.isTrunkOpenSetter(vehicle, true);
                alt.emitServer('vehicle-interaction:openTrunkRequest', vehicle, JSON.stringify(Calculation.getEntityRearPosition(vehicle.scriptID)));
            }

        } else {
            alt.emit('notify:error', 'Wystąpił bląd!', 'Nie masz uprawnień do otwierania lub zamykania drzwi');
        }

    }

    async function playerEnterVehicle(seat: number) {
        // Automatyczne wylączanie wlączania silnika
        if (seat === 1) {
            game.setPedConfigFlag(player.scriptID, 429, true);
        }

    }

    async function turnVehicleEngine() {
        webView.close();

        if (player.vehicle === null || player.vehicle === undefined) {
            return alt.emit('notify:error', null, 'Musisz znajdywać się w pojeździe, aby wykonać tą operacje');
        }

        if (!VehicleHelper.isVehicleOwner(vehicleTransformData, player)) {
            return NativeNotification.showNotification(null, nativeNotificationType.LockSystem, 0, 'Nie posiadasz kluczy', '~g~ Zamek centralny', 'Aby odpalić ten pojazd musisz posiadać do niego klucze', 1);
        }

        if (VehicleHelper.isVehicleEngineBroken(player.vehicle)) {
            const fireProbability = Calculation.probability(30);

            if (fireProbability) {

                alt.setTimeout(() => {
                    const playerLastVehicle = game.getVehiclePedIsIn(player.scriptID, true);
                    const playerLastVehiclePos: Vector3 = game.getEntityCoords(playerLastVehicle, true);

                    game.addExplosion(playerLastVehiclePos.x, playerLastVehiclePos.y, playerLastVehiclePos.z, 19, 10.5, true, false, 1.0, true);

                    alt.setTimeout(() => {
                        game.addExplosion(playerLastVehiclePos.x, playerLastVehiclePos.y, playerLastVehiclePos.z, 3, 10.5, true, false, 1.0, false);

                    },             5000);
                },             2000);

                if (game.getIsVehicleEngineRunning(player.vehicle.scriptID)) {
                    // Trzeba zastopować pojazd
                    game.setVehicleHandbrake(vehicle.scriptID, true);
                }

                return;
            }

            if (!game.getIsVehicleEngineRunning(player.vehicle.scriptID))  {
                NativeNotification.showNotification(null, nativeNotificationType.LockSystem, 0, 'Próbuje odpalić silnik', '~g~ Stacyjka', 'Coś w samochodzie nie gra, podjedź do mechanika', 1);

                const engineOnProbability = Calculation.probability(50);

                if (!engineOnProbability) {
                    alt.setTimeout(() => {
                        NativeNotification.showNotification(null, nativeNotificationType.Error, 0, 'Próba nieudana', '~g~ Stacyjka', 'Spróbuj odpalić samochód ponownie', 1);
                    },             2000);
                    return;
                }

                alt.setTimeout(() => {
                    return game.setVehicleEngineOn(player.vehicle.scriptID, true, false, true);
                },             2000);
            }
        }

        if (!game.getIsVehicleEngineRunning(player.vehicle.scriptID) && !VehicleHelper.isVehicleEngineBroken(player.vehicle)) {
            return game.setVehicleEngineOn(player.vehicle.scriptID, true, false, true);
        }

        return game.setVehicleEngineOn(player.vehicle.scriptID, false, false, true);
    }


    async function getVehicleInfo() {
        webView.close();

        alt.emitServer('vehicle-interaction:getVehicleInfo');
    }

};
