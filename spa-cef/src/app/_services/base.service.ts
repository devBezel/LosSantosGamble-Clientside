import { Injectable, NgZone } from '@angular/core';
import { AltvService } from './altv.service';
import { NotifyService } from './notify.service';
import { Router } from '@angular/router';
import { Vehicle } from '../_models/vehicle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  hasPremium: boolean;
  vehicleList: Vehicle[];
  userAtmInformation: { name: string, surname: string, money: number, bank: number };

  constructor(private altvService: AltvService, private ngZone: NgZone, private notify: NotifyService,
              private router: Router) {
    this.showNotifySuccess();
    this.showNotifyError();
    this.redirectToPage();

    this.altvService.on('cef:descriptionHasPremium', async (hasPrem: boolean) => {
        await this.ngZone.run(async () => { this.hasPremium = hasPrem; });
    });

    this.altvService.on('cef:vehicleList', async (vehicles: Vehicle[]) => {
      await this.ngZone.run(async () => { this.vehicleList = vehicles; console.log(this.vehicleList); } );
    });

    this.altvService.on('cef:atmInformation', async (atm: { name: string, surname: string, money: number, bank: number }) => {
      await this.ngZone.run(async () => { this.userAtmInformation = atm; });
    });


  }

  showNotifySuccess() {
    this.altvService.on('notify:success', async (title: string, message: string) => {
      await this.ngZone.run(async () => await this.notify.success(title, message));
    });
  }

  showNotifyError() {
    this.altvService.on('notify:error', async (title: string, message: string) => {
      await this.ngZone.run(async () => await this.notify.error(title, message));
    });
  }

  redirectToPage() {
    this.altvService.on('change:route', async (routeClient: string) => {
      console.log('przekierowywuje');
      await this.ngZone.run(async () => await this.router.navigate([routeClient]));
    });
  }


}
