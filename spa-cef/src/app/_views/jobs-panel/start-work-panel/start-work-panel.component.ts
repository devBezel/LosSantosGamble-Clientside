import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { JobEntityModel } from 'src/app/_models/jobEntityModel';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-start-work-panel',
  templateUrl: './start-work-panel.component.html',
  styleUrls: ['./start-work-panel.component.css']
})
export class StartWorkPanelComponent implements OnInit {

  casualJobData?: { playerWorking: boolean, data: JobEntityModel };

  constructor(private baseService: BaseService, private altvService: AltvService) { }

  ngOnInit() {

    setTimeout(() => {
      this.casualJobData = this.baseService.casualJobData;
      console.log(`${this.casualJobData.data.jobName}`);
    }, 2);
  }

  // get isPlayerWorking() {
  //   return this.casualJobData.playerWorking === true ? 'Zakończ pracę' : 'Rozpocznij pracę';
  // }

  startWork() {
    this.altvService.emit('job:start');
  }
}
