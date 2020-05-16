import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { WarehouseOrderModel } from 'src/app/_models/warehouseOrderModel';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-courier-orders-panel',
  templateUrl: './courier-orders-panel.component.html',
  styleUrls: ['./courier-orders-panel.component.css']
})
export class CourierOrdersPanelComponent implements OnInit {

  currentOrders: WarehouseOrderModel[];

  constructor(private baseService: BaseService, private atlvService: AltvService) { }

  ngOnInit() {
    setTimeout(() => {
      this.currentOrders = this.baseService.warehouseOrders;
    }, 2);
  }

  deliveryOfThePackage(orderId: number) {
    this.atlvService.emit('job-courier:startDelivery', orderId);
  }

}
