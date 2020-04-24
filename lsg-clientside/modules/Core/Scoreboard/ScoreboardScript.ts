import * as alt from 'alt';
import { Key } from 'client/modules/Constant/Keys/Key';
import { View } from '../Utilities/View';

export default async () => {

    let scoreboardOpen: boolean = false;
    let webView: View;

    alt.onServer('scoreboard:data', fetchPlayersDataToScoreboard);

    alt.on('keyup', async (key: any) => {
        if (key === Key.INSERT) {
            if (scoreboardOpen) {
                closeScoreboard();
            } else {
                openScoreboard();

            }
        }
        // else if (key === Key.ESCAPE) {
        //     scoreboardOpen = false;
        // }
    });


    async function openScoreboard() {
        alt.emitServer('scoreboard:fetchPlayers');
    }

    async function fetchPlayersDataToScoreboard(players: ScoreboardPlayerModel[]) {
        if (!webView) {
            webView = new View();
        }
        if (alt.Player.local.getMeta('viewOpen')) return;

        scoreboardOpen = true;
        webView.open('', true, 'scoreboard', true, false);

        // players.forEach((plr: ScoreboardPlayerModel) => {
        //     console.log(plr.formatName);
        // });
        webView.emit('scoreboard:fetchPlayers', players, alt.Player.all.length);
    }

    async function closeScoreboard() {
        webView.close();
        scoreboardOpen = false;
    }

};

export interface ScoreboardPlayerModel {
    id: number;
    formatName: string;
    gamblePoints: number;
    ping: number;
}
