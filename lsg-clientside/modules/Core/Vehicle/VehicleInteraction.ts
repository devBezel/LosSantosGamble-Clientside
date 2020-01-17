import * as alt from 'alt';
import * as game from 'natives';
import { Key } from 'client/modules/Constant/Keys/Key';
import { View } from '../Utilities/View';
import { Vehicle } from 'client/modules/Models/vehicle';
import { Animation } from '../Utilities/Animation';
import { VehicleHelper } from './VehicleHelper';
import { Calculation } from '../Utilities/Calculation';

export default async () => {

    let webView: View;
    let vehicle: alt.Vehicle;
    let vehicleTransformData: Vehicle;
    const player = alt.Player.local;

    alt.onServer('player:enterVehicle', playerEnterVehicle);

    alt.on('keyup', async (key: any) => {

        if (key === Key.ESCAPE) {
            if (webView === null || webView === undefined) {
                return;
            }
            webView.close();
        }
    });

    enum doorLockState {
        Open = 1,
        Closed = 3,
    }

    alt.on('keyup', async (key: any) => {
        if (key === Key.E) {

            const vehicleRange = VehicleHelper.getVehicleInRange(player.pos, 5);
            if (vehicleRange === null || vehicleRange === undefined) return;
            if (player.vehicle != null) return;

            const vehicleData: Vehicle = vehicleRange.getSyncedMeta('vehicle:syncedData');

            if (vehicleData === null || vehicleData === undefined) return;

            if (!webView) {
                webView = new View();
            }
            vehicle = vehicleRange;
            vehicleTransformData = vehicleData;


            webView.open('', true, 'vehicle/interaction');
            webView.on('cef-vehicle-interaction:openVehicle', openDoorLockVehicle);
            webView.on('cef-vehicle-interaction:openDoor', openVehicleDoor);
        }

        if (key === Key.ALT) {
            if (player.vehicle == null) return;

            const vehicleData: Vehicle = player.vehicle.getSyncedMeta('vehicle:syncedData');
            if (vehicleData === null || vehicleData === undefined) return;


            if (!webView) {
                webView = new View();
            }

            vehicleTransformData = vehicleData;

            webView.open('', true, 'vehicle/interaction/into', true);
            webView.on('cef-vehicle-interaction:turnEngine', turnVehicleEngine);
        }
    });


    async function openDoorLockVehicle() {
        webView.close();

        if (vehicle.scriptID === null || vehicle.scriptID === undefined) return;

        if (!VehicleHelper.isVehicleOwner(vehicleTransformData, player)) {
            return alt.emit('notify:error', null, 'Nie posiadasz kluczy do tego pojazdu');
        }

        const animation = new Animation('anim@mp_player_intmenu@key_fob@', 'fob_click_fp', 200);
        await animation.loadAnimDictAsync();

        if (game.getVehicleDoorLockStatus(vehicle.scriptID) !== doorLockState.Closed) {
            game.setVehicleDoorsLocked(vehicle.scriptID, 3);

            animation.playAnim();
            return alt.emit('notify:success', null, 'Pojazd został zamknięty');
        }

        game.setVehicleDoorsLocked(vehicle.scriptID, 1);
        animation.playAnim();

        return alt.emit('notify:success', null, 'Pojazd został otwarty');
    }

    async function openVehicleDoor(door: number) {
        webView.close();

        if (vehicle.scriptID === null || vehicle.scriptID === undefined) return;

        if (VehicleHelper.isVehicleLocked(vehicle)) {
            return alt.emit('notify:error', null, 'Ten pojazd jest zamknięty, musisz go otworzyć');
        }

        if (VehicleHelper.isDoorOpen(vehicle, door)) {
            return game.setVehicleDoorShut(vehicle.scriptID, door, false);
        }
        return game.setVehicleDoorOpen(vehicle.scriptID, door, false, false);
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
            return alt.emit('notify:error', null, 'Nie posiadasz kluczy do tego pojazdu');
        }

        if (VehicleHelper.isVehicleEngineBroken(player.vehicle)) {
            const fireProbability = Calculation.probability(30);

            if (fireProbability) {

                alt.setTimeout(() => {
                    game.addExplosion(player.vehicle.pos.x, player.vehicle.pos.y, player.vehicle.pos.z, 19, 10.5, true, false, 1.0, true);

                    alt.setTimeout(() => {
                        game.addExplosion(player.vehicle.pos.x, player.vehicle.pos.y, player.vehicle.pos.z, 3, 10.5, true, false, 1.0, false);

                    },             1000);
                },             2000);

                if (game.getIsVehicleEngineRunning(player.vehicle.scriptID)) {
                    // Trzeba zastopować pojazd
                    game.setVehicleHandbrake(vehicle.scriptID, true);
                }

                return;
            }

            if (!game.getIsVehicleEngineRunning(player.vehicle.scriptID))  {
                alt.emit('notify:warning', 'Przekręcono kluczyk', 'Próbuje odpalić silnik');

                const engineOnProbability = Calculation.probability(50);

                if (!engineOnProbability) {
                    alt.setTimeout(() => {
                        alt.emit('notify:error', '', 'Nie udało się uruchomić silnika');
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

};
