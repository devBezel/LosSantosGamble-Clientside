import * as alt from 'alt';
import * as game from 'natives';
import { vehicleConfig } from 'client/modules/Configs/VehicleConfig';
import { Calculation } from '../Utilities/Calculation';


export default async () => {

    alt.setInterval(() => {

        const player = alt.Player.local.scriptID;
        const vehicle = alt.Player.local.vehicle;

        if (vehicle === null || vehicle === undefined) return;
        if (game.getEntityHealth(vehicle.scriptID) > vehicleConfig.damage.undamaged) return;
        if (!game.getIsVehicleEngineRunning(vehicle.scriptID)) return;

        if (game.getEntityHealth(vehicle.scriptID) <= vehicleConfig.damage.highDevasted) {
            const engineOnProbability = Calculation.probability(vehicleConfig.vehicleDamageTurnOff.percent.highDevasted);

            if (!engineOnProbability) return;

            game.setVehicleEngineOn(vehicle.scriptID, false, true, true);

            return alt.emit('notify:warning', 'Silnik zgasł', 'Twój silnik jest uszkodzony, udaj się do mechanika');

        }

        if (game.getEntityHealth(vehicle.scriptID) <= vehicleConfig.damage.mediumDevasted) {
            const engineOnProbability = Calculation.probability(vehicleConfig.vehicleDamageTurnOff.percent.mediumDevasted);

            if (!engineOnProbability) return;

            game.setVehicleEngineOn(vehicle.scriptID, false, true, true);

            return alt.emit('notify:warning', 'Silnik zgasł', 'Twój silnik jest uszkodzony, udaj się do mechanika');
        }

        if (game.getEntityHealth(vehicle.scriptID) <= vehicleConfig.damage.lowDevasted) {
            const engineOnProbability = Calculation.probability(vehicleConfig.vehicleDamageTurnOff.percent.lowDevasted);

            if (!engineOnProbability) return;

            game.setVehicleEngineOn(vehicle.scriptID, false, true, true);

            return alt.emit('notify:warning', 'Silnik zgasł', 'Twój silnik jest uszkodzony, udaj się do mechanika');
        }

    },              60000);
};

