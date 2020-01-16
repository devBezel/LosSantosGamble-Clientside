import * as alt from 'alt';
import * as game from 'natives';
import { vehicleConfig } from 'client/modules/Configs/VehicleConfig';


export default async () => {

    // let vehicleStatus: VehicleDamage;

    // enum VehicleDamage {
    //     MediumDevastated = 1,
    //     HighDevastated = 2,
    // }

    alt.setInterval(() => {

        const player = alt.Player.local.scriptID;
        const vehicle = alt.Player.local.vehicle;

        if (vehicle === null || vehicle === undefined) return;
        if (game.getEntityHealth(vehicle.scriptID) > vehicleConfig.damage.undamaged) return;

        // if (game.getEntityHealth(vehicle.scriptID) <= vehicleConfig.damage.mediumDamaged) {
        //     return vehicleStatus = VehicleDamage.MediumDevastated;
        // }

        if (game.getEntityHealth(vehicle.scriptID) <= vehicleConfig.damage.devasted) {
            game.setVehicleEngineOn(vehicle.scriptID, false, true, true);
        }

    },              10);
};

