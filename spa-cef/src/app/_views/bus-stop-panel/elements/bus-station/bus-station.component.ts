import { Component, OnInit, Input } from '@angular/core';
import { BusStopStation } from 'src/app/_models/busStopStation';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-bus-station',
  templateUrl: './bus-station.component.html',
  styleUrls: ['./bus-station.component.css']
})
export class BusStationComponent implements OnInit {
  @Input() busStationsInformation: BusStopStation[];
  constructor(private altvService: AltvService) { }

  ngOnInit() {
  }

  selectStation(station: BusStopStation) {
    this.altvService.emit('cef:selectBusStation', station.id, station.cost, station.time, station.posX, station.posY, station.posZ);
  }

}
