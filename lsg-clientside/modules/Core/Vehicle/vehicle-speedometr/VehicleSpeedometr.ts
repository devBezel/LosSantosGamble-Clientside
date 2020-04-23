import * as alt from 'alt';
import * as game from 'natives';

export default async () => {

    const player = alt.Player.local;
    let vehicleInterval: number;

    const webView: alt.WebView = new alt.WebView('http://resources/ls_gamble/client/lsg_vehicle_hud/app.html');

    alt.onServer('player:enterVehicle', showPlayerSpeedometr);
    alt.onServer('player:leaveVehicle', closePlayerSpeedometr);
    alt.onServer('player:changeVehicleSeat', changePlayerSeat);

    async function showPlayerSpeedometr(seat: number) {
        if (seat !== 1) return;


        webView.emit('vehicle-speedometr:open');

        vehicleInterval = alt.setInterval(() => {
            if (player.vehicle === null || player.vehicle === undefined) {

                alt.clearInterval(vehicleInterval);
                webView.emit('vehicle-speedometr:close');

                return;
            }

            const vehicleSpeed = Math.ceil(player.vehicle.speed * 3.6);
            const vehicleFuel = 0;

            // TODO: Dorobić ilość maksymalnego paliwa i przebieg
            webView.emit('vehicle-speedometr:data', vehicleSpeed, vehicleFuel);

        },                                2);
    }

    async function closePlayerSpeedometr(seat: number) {
        if (seat !== 1) return;

        webView.emit('vehicle-speedometr:close');
        alt.clearInterval(vehicleInterval);
    }

    async function changePlayerSeat(oldSeat: number, newSeat: number) {
        if (oldSeat === 1) {
            return closePlayerSpeedometr(oldSeat);
        }

        if (newSeat === 1) {
            return showPlayerSpeedometr(newSeat);
        }
    }
};
