import { Component, OnInit, Inject } from '@angular/core';
import { Building } from 'src/app/_models/building';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-building-sale-dialog',
  templateUrl: './building-sale-dialog.component.html',
  styleUrls: ['./building-sale-dialog.component.css']
})
export class BuildingSaleDialogComponent {

  color = 'primary';

  constructor(@Inject(MAT_DIALOG_DATA) public buildingData: Building) { }

}
