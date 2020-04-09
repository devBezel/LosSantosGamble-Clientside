import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Building } from 'src/app/_models/building';

@Component({
  selector: 'app-building-editor-dialog',
  templateUrl: './building-editor-dialog.component.html',
  styleUrls: ['./building-editor-dialog.component.css']
})
export class BuildingEditorDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public buildingData?: Building) { }

}
