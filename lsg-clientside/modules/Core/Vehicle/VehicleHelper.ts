import * as alt from 'alt';
import * as game from 'natives';


import { distance } from '../Utilities/Calculation';
import { transpileModule } from 'typescript';

export function getVehicleInRange(pos: Vector3, range: number): alt.Vehicle {
    const vehicles = alt.Vehicle.all.find(x => distance(x.pos, pos) <= range);

    return vehicles;
}
export function isVehicleLocked(vehicle: alt.Vehicle) {
    if (game.getVehicleDoorLockStatus(vehicle.scriptID) === 3) {
        return true;
    }

    return false;
}

export function isDoorOpen(vehicle: alt.Vehicle, door: number) {
    if (game.getVehicleDoorAngleRatio(vehicle.scriptID, door) > 0) {
        return true;
    }

    return false;
}
