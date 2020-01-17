import * as alt from 'alt';
import * as game from 'natives';


import { transpileModule } from 'typescript';
import { Vehicle } from 'client/modules/Models/vehicle';
import { vehicleConfig } from 'client/modules/Configs/VehicleConfig';
import { Calculation } from '../Utilities/Calculation';


export class VehicleHelper {
    static getVehicleInRange(pos: Vector3, range: number): alt.Vehicle {
        const vehicles = alt.Vehicle.all.find(x => Calculation.distance(x.pos, pos) <= range);

        return vehicles;
    }
    static isVehicleLocked(vehicle: alt.Vehicle) {
        if (game.getVehicleDoorLockStatus(vehicle.scriptID) === 3) {
            return true;
        }

        return false;
    }

    static isDoorOpen(vehicle: alt.Vehicle, door: number) {
        if (game.getVehicleDoorAngleRatio(vehicle.scriptID, door) > 0) {
            return true;
        }

        return false;
    }

    static isVehicleOwner(vehicleData: Vehicle, player: alt.Player) {
        if (vehicleData.ownerId === player.characterData().id) {
            return true;
        }

        return false;
    }

    static isVehicleEngineBroken(vehicle: alt.Vehicle) {
        if (game.getEntityHealth(vehicle.scriptID) <= vehicleConfig.damage.highDevasted) {
            return true;
        }
        return false;
    }
}


