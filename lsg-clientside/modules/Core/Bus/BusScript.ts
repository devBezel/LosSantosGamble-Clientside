import * as alt from 'alt';
import * as game from 'natives';
import { BusStop } from 'client/modules/Models/busStop';
import { BusStopStation } from 'client/modules/Models/busStopStation';
import { View } from '../Utilities/View';
import { Key } from 'client/modules/Constant/Keys/Key';
import { LoadingScreen, Context } from '../Utilities/LoadingScreen';


export default async () => {
    let webView: View;

    alt.on('keyup', async (key: any) => {
        if (key === Key.ESCAPE) {
            if (webView === null || webView === undefined) {
                return;
            }
            webView.close();
        }
    });

    alt.onServer('bus:information', openBusWindow);
    alt.onServer('bus:moneyRemovedStartTimer', startBusTimer);

    async function openBusWindow(bus: BusStop, busStations: BusStopStation[]) {
        if (!webView) {
            webView = new View();
        }

        if (alt.Player.local.getMeta('viewOpen')) return;

        webView.open('', true, 'bus');
        webView.emit('cef:busInformation', bus, busStations);
        webView.on('cef:selectBusStation', selectBusStation);
        alt.log(busStations.length);
    }

    async function selectBusStation(id: number, cost: number, time: number, posX: number, posY: number, posZ: number) {
        alt.emitServer('bus:selectStation', id, cost, time, posX, posY, posZ);
    }

    async function startBusTimer(time: number, posX: number, posY: number, posZ: number) {

        webView.close();
        alt.Player.local.setMeta('scaleform:nicknameTurnOff', true);

        let toCountDown = Math.floor(time * 60);
        const interval = alt.setInterval(() => {
            toCountDown--;
            if (toCountDown < 0) {
                alt.clearInterval(interval);
            }
        },                               1000);



        const scaleformInterval = alt.setInterval(() => {
            const loadingScreen = new LoadingScreen();

            const minutes = Math.floor(toCountDown / 60);
            const seconds = toCountDown - minutes * 60;
            loadingScreen.setContext(Context.PcLanding);
            loadingScreen.setProgressTitle('Pozostało: ');
            loadingScreen.setProgressText(`${minutes} min ${seconds} sek`);
            loadingScreen.draw();

            if (toCountDown <= 0) {
                loadingScreen.destroy();
                alt.clearInterval(scaleformInterval);

                alt.Player.local.setMeta('scaleform:nicknameTurnOff', false);
                game.setEntityCoords(alt.Player.local.scriptID, posX, posY, posZ, false, false, false, false);
            }

        },                                        5);
    }
};
