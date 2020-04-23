import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { Item } from 'src/app/_models/item';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-search-entity-panel',
  templateUrl: './search-entity-panel.component.html',
  styleUrls: ['./search-entity-panel.component.css']
})
export class SearchEntityPanelComponent implements OnInit {

  searchEntityItems: Item[];

  constructor(private baseService: BaseService, private altvService: AltvService) { }

  ngOnInit() {
    setTimeout(() => {
      this.searchEntityItems = this.baseService.searchEntityItems;
    }, 2);
  }

  confiscateEntityItem(item: Item) {
    const itemToDelete = this.searchEntityItems.findIndex(i => i.id === item.id);
    this.searchEntityItems.splice(itemToDelete, 1);

    this.altvService.emit('group:confiscatePlayerItem', item);
  }

}
