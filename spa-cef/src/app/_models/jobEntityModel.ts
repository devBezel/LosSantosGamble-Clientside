import { JobType } from '../_enums/JobType';

export interface JobEntityModel {
    jobName?: string;
    jobType?: JobType;
    maxSalary?: number;
}
