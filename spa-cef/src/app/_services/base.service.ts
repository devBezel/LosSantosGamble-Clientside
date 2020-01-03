import { Injectable, NgZone } from '@angular/core';
import { AltvService } from './altv.service';
import { NotifyService } from './notify.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  hasPremium: boolean;

  constructor(private altvService: AltvService, private ngZone: NgZone, private notify: NotifyService,
              private router: Router) {
    this.showNotifySuccess();
    this.showNotifyError();
    this.redirectToPage();

    this.altvService.on('cef:descriptionHasPremium', async (hasPrem: boolean) => {
        console.log('baseservice: ' + hasPrem);
        this.hasPremium = hasPrem;
    });
  }

  showNotifySuccess() {
    this.altvService.on('notify:success', async (title: string, message: string) => {
      console.log(title);
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