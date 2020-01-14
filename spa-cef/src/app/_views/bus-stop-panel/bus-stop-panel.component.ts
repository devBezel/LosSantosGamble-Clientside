import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { BusStop } from 'src/app/_models/busStop';
import { BusStopStation } from 'src/app/_models/busStopStation';

@Component({
  selector: 'app-bus-stop-panel',
  templateUrl: './bus-stop-panel.component.html',
  styleUrls: ['./bus-stop-panel.component.css']
})
export class BusStopPanelComponent implements OnInit {

  busStopInformation: BusStop;
  busStationsInformation: BusStopStation[];

  constructor(private baseService: BaseService) { }

  ngOnInit() {
    setTimeout(() => {
      this.busStopInformation = this.baseService.busStopInformation;
      this.busStationsInformation = this.baseService.busStationsInformation;
    }, 5);
  }

}
