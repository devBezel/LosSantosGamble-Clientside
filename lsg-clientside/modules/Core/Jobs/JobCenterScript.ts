import * as alt from 'alt';
import { JobEntityModel } from 'client/modules/Models/jobEntityModel';
import { View } from '../Utilities/View';
import { JobType } from 'client/modules/Enum/JobType';

export default async () => {
    let webView: View;

    alt.onServer('job-center:showWindow', showJobCenterWindow);


    async function showJobCenterWindow(currentJob: JobType, jobs: JobEntityModel[]) {
        if (!webView) {
            webView = new View();
        }
        alt.log(`jobs length: ${jobs.length}`);
        webView.open('', true, 'job/center', true);
        webView.emit('job-center:data', currentJob, jobs);
        webView.on('job-center:setJob', setJob);
    }

    async function setJob(jobType: JobType) {
        webView.close();

        alt.emitServer('job-center:setJob', jobType);
    }
};
