import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { Building } from 'src/app/_models/building';
import { AltvService } from 'src/app/_services/altv.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuildingEditorDialogComponent } from './elements/building-editor-dialog/building-editor-dialog.component';
import { BuildingSaleDialogComponent } from './elements/building-sale-dialog/building-sale-dialog.component';
// tslint:disable-next-line:max-line-length
import { BuildingWithdrawBalanceDialogComponent } from './elements/building-withdraw-balance-dialog/building-withdraw-balance-dialog.component';
import { BuildingMagazineDialogComponent } from './elements/building-magazine-dialog/building-magazine-dialog.component';
import { Item } from 'src/app/_models/item';
@Component({
  selector: 'app-building-panel',
  templateUrl: './building-panel.component.html',
  styleUrls: ['./building-panel.component.css']
})
export class BuildingPanelComponent implements OnInit {

  buildingData?: { building: Building, buildingItems: Item[], playerItems: Item[] };


  constructor(private baseService: BaseService, private altvService: AltvService, public buildingEditorDialog: MatDialog,
              public buildingSaleDialog: MatDialog, public buildingWithdrawBalanceDialog: MatDialog,
              public buildingMagazineDialog: MatDialog) { }

  ngOnInit() {
    setTimeout(() => {
      this.buildingData = this.baseService.buildingData;
    }, 2);
  }

  lockBuilding() {
    this.altvService.emit('building:requestLock');
  }

  openBuildingEditor() {
    const dialogRef = this.buildingEditorDialog.open(BuildingEditorDialogComponent, {
      data: this.buildingData.building
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.altvService.emit('building:editData', this.buildingData.building.name, this.buildingData.building.entryFee);
    });
  }

  openBuildingSaleEditor() {
    const dialogRef = this.buildingSaleDialog.open(BuildingSaleDialogComponent, {
      data: this.buildingData.building
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === null || result === undefined) { return; }
      this.altvService.emit('building:editOnSaleData', this.buildingData.building.onSale, this.buildingData.building.saleCost);
    });
  }

  withdrawBalanceEditor() {
    const dialogRef = this.buildingWithdrawBalanceDialog.open(BuildingWithdrawBalanceDialogComponent, {
      data: this.buildingData.building
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === null || result === undefined) { return; }

      this.altvService.emit('building:withdrawBalance', result);

    });
  }

  openBuildingMagazineEditor() {
    const dialogRef = this.buildingMagazineDialog.open(BuildingMagazineDialogComponent, {
      data: this.buildingData
    });

  }

}
