import * as alt from 'alt';
import * as game from 'natives';
import { Key } from 'client/modules/Constant/Keys/Key';
import { getVehicleInRange, isVehicleLocked, isDoorOpen } from './VehicleHelper';
import { View } from '../Utilities/View';
import { Vehicle } from 'client/modules/Models/vehicle';
import { Animation } from '../Utilities/Animation';

export default async () => {

    let webView: View;
    let vehicle: alt.Vehicle;
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

            const vehicleRange = getVehicleInRange(alt.Player.local.pos, 5);
            if (vehicleRange === null || vehicleRange === undefined) return;
            if (player.vehicle != null) return;

            const vehicleData: Vehicle = vehicleRange.getSyncedMeta('vehicle:syncedData');

            if (vehicleData === null || vehicleData === undefined) return;

            if (!webView) {
                webView = new View();
            }
            vehicle = vehicleRange;

            webView.open('', true, 'vehicle/interaction');
            webView.emit('vehicle-interaction:vehicleData', vehicleData);
            webView.on('cef-vehicle-interaction:openVehicle', openDoorLockVehicle);
            webView.on('cef-vehicle-interaction:openDoor', openVehicleDoor);
        }
    });


    async function openDoorLockVehicle(vehicleData: Vehicle) {
        webView.close();

        if (vehicle.scriptID === null || vehicle.scriptID === undefined) return;

        if (vehicleData.ownerId !== player.characterData().id) {
            return alt.emit('notify:error', null, 'Nie posiadasz kluczy do tego pojazdu');
        }

        const animation = new Animation('anim@amb@clubhouse@tutorial@bkr_tut_ig3@', 'machinic_loop_mechandplayer', 1000);
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

    async function openVehicleDoor(vehicleData: Vehicle, door: number) {
        webView.close();

        if (vehicle.scriptID === null || vehicle.scriptID === undefined) return;

        if (isVehicleLocked(vehicle)) {
            return alt.emit('notify:error', null, 'Ten pojazd jest zamknięty, musisz go otworzyć');
        }

        if (isDoorOpen(vehicle, door)) {
            return game.setVehicleDoorShut(vehicle.scriptID, door, false);
        }
        return game.setVehicleDoorOpen(vehicle.scriptID, door, false, false);
    }

    async function playerEnterVehicle(seat: number) {
        alt.log(`miejsce ${seat}`);
        // Automatyczne wylączanie wlączania silnika
        if (seat === 1) {
            alt.log(`miejsce ${seat}`);
            game.setPedConfigFlag(alt.Player.local.scriptID, 429, true);
        }

    }

};
