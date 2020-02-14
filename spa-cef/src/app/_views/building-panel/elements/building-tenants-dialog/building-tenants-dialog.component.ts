import { Component, OnInit, Inject } from '@angular/core';
import { BuildingTenant } from 'src/app/_models/buildingTenant';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-building-tenants-dialog',
  templateUrl: './building-tenants-dialog.component.html',
  styleUrls: ['./building-tenants-dialog.component.css']
})
export class BuildingTenantsDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public buildingTanentsData: BuildingTenant[]) {

  }
}
