import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { InteractionCef } from 'src/app/_models/interactionCef';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-interaction-menu',
  templateUrl: './interaction-menu.component.html',
  styleUrls: ['./interaction-menu.component.css']
})
export class InteractionMenuComponent implements OnInit {

  interactionMenuData: InteractionCef[];

  constructor(private baseService: BaseService, private altvService: AltvService) { }

  ngOnInit() {
    setTimeout(() => {
      this.interactionMenuData = this.baseService.interactionMenuData;
    }, 2);
  }

  sendRequest(event, values?: { value1?: any, value2?: any, value3?: any }) {
    this.altvService.emit(event, values);
  }

}
