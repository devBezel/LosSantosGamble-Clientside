import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { Building } from 'src/app/_models/building';
import { AltvService } from 'src/app/_services/altv.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogState } from '@angular/material/dialog';
import { BuildingEditorDialogComponent } from './elements/building-editor-dialog/building-editor-dialog.component';
import { BuildingSaleDialogComponent } from './elements/building-sale-dialog/building-sale-dialog.component';
// tslint:disable-next-line:max-line-length
import { BuildingWithdrawBalanceDialogComponent } from './elements/building-withdraw-balance-dialog/building-withdraw-balance-dialog.component';
import { BuildingMagazineDialogComponent } from './elements/building-magazine-dialog/building-magazine-dialog.component';
import { Item } from 'src/app/_models/item';
import { BuildingPlayersOnlineDialogComponent } from './elements/building-players-online-dialog/building-players-online-dialog.component';
import { BuildingTenant } from 'src/app/_models/buildingTenant';
import { NotifyService } from 'src/app/_services/notify.service';
import { BuildingTenantsDialogComponent } from './elements/building-tenants-dialog/building-tenants-dialog.component';
@Component({
  selector: 'app-building-panel',
  templateUrl: './building-panel.component.html',
  styleUrls: ['./building-panel.component.css']
})
export class BuildingPanelComponent implements OnInit {

  buildingData?: { building: Building, buildingItems: Item[], playerItems: Item[],
                   playersInBuilding: { id: number, name: string }[], tenant: BuildingTenant  };


  constructor(private baseService: BaseService, private altvService: AltvService, public buildingEditorDialog: MatDialog,
              public buildingSaleDialog: MatDialog, public buildingWithdrawBalanceDialog: MatDialog,
              public buildingMagazineDialog: MatDialog, public buildingPlayersOnlineDialog: MatDialog, private notify: NotifyService,
              public buildingTenantsEditor: MatDialog) { }

  ngOnInit() {
    setTimeout(() => {
      this.buildingData = this.baseService.buildingData;
    }, 2);
  }

  lockBuilding() {
    console.log('zamykam budynek');
    if (!this.buildingData.tenant.canLockDoor) {
      return this.notify.warning('Budynek', 'Nie posiadasz do tego uprawnień');
    }

    this.altvService.emit('building:requestLock');
  }

  openBuildingEditor() {
    console.log(this.buildingData.building);
    if (!this.buildingData.tenant.canEditBuilding) {
      return this.notify.warning('Budynek', 'Nie posiadasz do tego uprawnień');
    }

    const dialogRef = this.buildingEditorDialog.open(BuildingEditorDialogComponent, {
      data: this.buildingData.building
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.altvService.emit('building:editData', this.buildingData.building.name, this.buildingData.building.entryFee);
    });
  }

  openBuildingSaleEditor() {
    if (!this.buildingData.tenant.canEditBuilding) {
      return this.notify.warning('Budynek', 'Nie posiadasz do tego uprawnień');
    }

    const dialogRef = this.buildingSaleDialog.open(BuildingSaleDialogComponent, {
      data: this.buildingData.building
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === null || result === undefined) { return; }
      this.altvService.emit('building:editOnSaleData', this.buildingData.building.onSale, this.buildingData.building.saleCost);
    });
  }

  withdrawBalanceEditor() {
    if (!this.buildingData.tenant.canWithdrawDeposit) {
      return this.notify.warning('Budynek', 'Nie posiadasz do tego uprawnień');
    }

    const dialogRef = this.buildingWithdrawBalanceDialog.open(BuildingWithdrawBalanceDialogComponent, {
      data: this.buildingData.building
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === null || result === undefined) { return; }

      this.altvService.emit('building:withdrawBalance', result);

    });
  }

  openBuildingMagazineEditor() {
    if (!this.buildingData.tenant.canManagmentMagazine) {
      return this.notify.warning('Budynek', 'Nie posiadasz do tego uprawnień');
    }
    const dialogRef = this.buildingMagazineDialog.open(BuildingMagazineDialogComponent, {
      data: this.buildingData
    });

  }

  openBuidlingPlayersOnlineListEditor() {
    if (!this.buildingData.tenant.canManagmentGuests) {
      return this.notify.warning('Budynek', 'Nie posiadasz do tego uprawnień');
    }

    const dialogRef = this.buildingPlayersOnlineDialog.open(BuildingPlayersOnlineDialogComponent, {
      data: this.buildingData.playersInBuilding
    });
  }

  openBuildingTenantsListEditor() {
    console.log(this.buildingData.building.buildingTenants.length);
    if (!this.buildingData.tenant.canManagmentTenants) {
      return this.notify.warning('Budynek', 'Nie posiadasz do tego uprawnień');
    }

    const dialogRef = this.buildingTenantsEditor.open(BuildingTenantsDialogComponent, {
      data: this.buildingData.building.buildingTenants
    });
  }

}
