import { JobType } from '../Enum/JobType';

export interface JobEntityModel {
    jobName: string;
    jobType: JobType;
    maxSalary: number;
}
