import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { Building } from 'src/app/_models/building';
import { AltvService } from 'src/app/_services/altv.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuildingEditorDialogComponent } from './elements/building-editor-dialog/building-editor-dialog.component';
import { BuildingSaleDialogComponent } from './elements/building-sale-dialog/building-sale-dialog.component';
// tslint:disable-next-line:max-line-length
import { BuildingWithdrawBalanceDialogComponent } from './elements/building-withdraw-balance-dialog/building-withdraw-balance-dialog.component';
@Component({
  selector: 'app-building-panel',
  templateUrl: './building-panel.component.html',
  styleUrls: ['./building-panel.component.css']
})
export class BuildingPanelComponent implements OnInit {

  buildingData?: Building;
  constructor(private baseService: BaseService, private altvService: AltvService, public buildingEditorDialog: MatDialog,
              public buildingSaleDialog: MatDialog, public buildingWithdrawBalanceDialog: MatDialog) { }

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
      data: this.buildingData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.altvService.emit('building:editData', this.buildingData.name, this.buildingData.entryFee);
    });
  }

  openBuildingSaleEditor() {
    const dialogRef = this.buildingSaleDialog.open(BuildingSaleDialogComponent, {
      data: this.buildingData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === null || result === undefined) { return; }
      this.altvService.emit('building:editOnSaleData', this.buildingData.onSale, this.buildingData.saleCost);
    });
  }

  withdrawBalanceEditor() {
    const dialogRef = this.buildingWithdrawBalanceDialog.open(BuildingWithdrawBalanceDialogComponent, {
      data: this.buildingData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === null || result === undefined) { return; }

      this.altvService.emit('building:withdrawBalance', result);

    });
  }

}
