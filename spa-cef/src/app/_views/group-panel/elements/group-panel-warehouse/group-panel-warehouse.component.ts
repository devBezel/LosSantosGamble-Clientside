import { Component, OnInit, Injectable, Input } from '@angular/core';
import { GroupData } from 'src/app/_models/GroupData';

@Component({
  selector: 'app-group-panel-warehouse',
  templateUrl: './group-panel-warehouse.component.html',
  styleUrls: ['./group-panel-warehouse.component.css']
})
export class GroupPanelWarehouseComponent implements OnInit {

  @Input() groupData: GroupData;

  constructor() { }

  ngOnInit() {
  }

}
