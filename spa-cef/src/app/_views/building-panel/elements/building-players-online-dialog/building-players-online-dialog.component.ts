import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-building-players-online-dialog',
  templateUrl: './building-players-online-dialog.component.html',
  styleUrls: ['./building-players-online-dialog.component.css']
})
export class BuildingPlayersOnlineDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public playersInBuilding: { id: number, name: string, player: any }[] ) { }

}
