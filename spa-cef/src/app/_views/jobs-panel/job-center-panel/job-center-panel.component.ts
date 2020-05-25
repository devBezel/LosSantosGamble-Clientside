import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { JobEntityModel } from 'src/app/_models/jobEntityModel';
import { AltvService } from 'src/app/_services/altv.service';
import { JobType } from 'src/app/_enums/JobType';

@Component({
  selector: 'app-job-center-panel',
  templateUrl: './job-center-panel.component.html',
  styleUrls: ['./job-center-panel.component.css']
})
export class JobCenterPanelComponent implements OnInit {

  jobCenter?: { currentJob?: JobType, jobs?: JobEntityModel[] };
  constructor(private baseService: BaseService, private altvService: AltvService) { }

  ngOnInit() {
    setTimeout(() => {
      this.jobCenter = this.baseService.jobsData;
    }, 2);
  }


  setJob(jobType: JobType) {
    this.altvService.emit('job-center:setJob', jobType);
  }

  get currentJob(): string {
    // tslint:disable-next-line:one-variable-per-declaration
    return this.jobCenter.jobs.find(x => x.jobType === this.jobCenter.currentJob).jobName;
  }
}
