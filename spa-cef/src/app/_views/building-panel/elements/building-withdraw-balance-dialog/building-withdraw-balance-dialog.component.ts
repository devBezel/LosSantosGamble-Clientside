import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Building } from 'src/app/_models/building';

@Component({
  selector: 'app-building-withdraw-balance-dialog',
  templateUrl: './building-withdraw-balance-dialog.component.html',
  styleUrls: ['./building-withdraw-balance-dialog.component.css']
})
export class BuildingWithdrawBalanceDialogComponent  {

  withdrawMoney: number;

  constructor(@Inject(MAT_DIALOG_DATA) public buildingData: Building) { }


}
