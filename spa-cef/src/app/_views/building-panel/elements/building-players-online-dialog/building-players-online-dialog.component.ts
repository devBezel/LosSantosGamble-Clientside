import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-building-players-online-dialog',
  templateUrl: './building-players-online-dialog.component.html',
  styleUrls: ['./building-players-online-dialog.component.css']
})
export class BuildingPlayersOnlineDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public playersInBuilding: { id: number, name: string }[],
              private altvService: AltvService ) { }

  turnSbOut(plrId: number) {
    this.altvService.emit('building:turnSbOut', plrId);
  }

  addPlayerToBuilding(plrId: number) {
    this.altvService.emit('building:addPlayer', plrId);
  }

}
