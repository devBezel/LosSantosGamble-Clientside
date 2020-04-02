import * as alt from 'alt';
import * as game from 'natives';
import { Draw } from '../Utilities/Draw';

export default async () => {

    const player = alt.Player.local;
    let vehicleInterval: number;

    alt.onServer('player:enterVehicle', showPlayerSpeedometr);
    alt.onServer('player:leaveVehicle', quitPlayerSpeedometr);
    alt.onServer('player:changeVehicleSeat', changePlayerSeat);

    async function showPlayerSpeedometr(seat: number) {
        if (seat !== 1) return;

        vehicleInterval = alt.setInterval(() => {
            if (player.vehicle === null || player.vehicle === undefined) {
                alt.clearInterval(vehicleInterval);
                return;
            }

            const vehicleSpeed = Math.ceil(player.vehicle.speed * 3.6);
            const vehicleGear = player.vehicle.gear;
            const vehicleFuel = 0;

            const readySpeed  = (vehicleSpeed > 80 ? `~r~${vehicleSpeed}` : `~w~${vehicleSpeed}`);
            Draw.drawTextConstant(0.633 + 0.10 , 1.432 - 0.05, 1.0, 1.0, 0.4, `${vehicleGear}~w~ Bieg`, 255, 255, 255, 255, false);
            Draw.drawTextConstant(0.633 + 0.15, 1.432 - 0.05, 1.0, 1.0, 0.4, `${readySpeed}~w~ km/h`, 255, 255, 255, 255, false);
            Draw.drawTextConstant(0.633 + 0.20, 1.432 - 0.05, 1.0, 1.0, 0.4, `Paliwo: ${vehicleFuel}~w~ L`, 255, 255, 255, 255, false);
        },                                2);

    }

    async function quitPlayerSpeedometr(seat: number) {
        if (seat !== 1) return;

        alt.clearInterval(vehicleInterval);
    }

    async function changePlayerSeat(oldSeat: number, newSeat: number) {
        if (oldSeat === 1) {
            return quitPlayerSpeedometr(oldSeat);
        }

        if (newSeat === 1) {
            return showPlayerSpeedometr(newSeat);
        }
    }
};
