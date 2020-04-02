import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from 'src/app/_models/vehicle';
import { AltvService } from 'src/app/_services/altv.service';
import { GroupData } from 'src/app/_models/GroupData';
import { GroupRightsService } from 'src/app/_services/group-rights.service';
import { NotifyService } from 'src/app/_services/notify.service';

@Component({
  selector: 'app-group-panel-vehicles',
  templateUrl: './group-panel-vehicles.component.html',
  styleUrls: ['./group-panel-vehicles.component.css']
})
export class GroupPanelVehiclesComponent implements OnInit {

  @Input() groupData: GroupData;

  constructor(private altvService: AltvService, private workRightsService: GroupRightsService, private notify: NotifyService) { }

  ngOnInit() {
  }

  respawnGroupVehicle(vehicle: Vehicle) {
    if (!this.workRightsService.canRespawnVehicle(this.groupData.worker.rights)) {
      return this.notify.error('Brak uprawnień', 'Nie posiadasz uprawnień, aby zrespić ten pojazd');
    }

    this.altvService.emit('cef:vehicleSpawn', vehicle.id);
  }

}
