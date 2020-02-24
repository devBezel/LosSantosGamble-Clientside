import * as alt from 'alt';
import { View } from '../Utilities/View';
import { Calculation } from '../Utilities/Calculation';


export default async () => {
    let webView: View;
    const player = alt.Player.local;
    alt.setInterval(() => {
        if (!webView) {
            webView = new View();
        }

        if (Calculation.getVehicleInRange(player.pos, 0.5)) {
            alt.log('znaleziono pojazd');
        }

    },              1000);
};
