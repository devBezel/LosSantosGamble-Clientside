import * as alt from 'alt';
import { JobEntityModel } from 'client/modules/Models/jobEntityModel';
import { View } from '../Utilities/View';

export default async () => {

    let webView: View;

    alt.onServer('job:showWorkWindow', showWorkWindow);


    async function showWorkWindow(playerWorking: boolean, jobEntity: JobEntityModel) {

        if (alt.Player.local.getMeta('viewOpen')) return;

        if (!webView) {
            webView = new View();
        }

        webView.open('', true, 'work/start', true);
        webView.emit('job:data',  playerWorking, jobEntity);
        webView.on('job:start', startCasualJob);
    }

    async function startCasualJob() {
        webView.close();

        alt.emitServer('job:start');
    }
};
