import { Component, OnInit } from '@angular/core';
import { SmartphoneApp } from 'src/app/_models/smartphoneApp';
import { SmartphoneData } from 'src/app/_models/smartphoneData';
import { BaseService } from 'src/app/_services/base.service';

@Component({
  selector: 'app-smartphone-panel',
  templateUrl: './smartphone-panel.component.html',
  styleUrls: ['./smartphone-panel.component.css']
})
export class SmartphonePanelComponent implements OnInit {

  smartphoneData: SmartphoneData;

  selectedApp = 0;


  public headerClockFormated = this.formatClockHoursMinutes;

  public currentApps: SmartphoneApp[] = [
    {
      id: 1,
      name: 'Mapy',
      picUrl: 'maps.png'
    },
    {
      id: 2,
      name: 'Zegar',
      picUrl: 'clock.png'
    },
    {
      id: 3,
      name: 'Pogoda',
      picUrl: 'weather.png'
    },
    {
      id: 4,
      name: 'Ustawienia',
      picUrl: 'settings.png'
    },
  ];

  public currentFooterApps: SmartphoneApp[] = [
    {
      id: 5,
      name: 'Telefon',
      picUrl: 'telephone.png'
    },
    {
      id: 6,
      name: 'Safari',
      picUrl: 'safari.png'
    },
    {
      id: 7,
      name: 'Wiadomości',
      picUrl: 'messages.png'
    },
    {
      id: 8,
      name: 'GTunes',
      picUrl: 'itunes.png'
    }
  ];

  constructor(private baseService: BaseService) { }


  ngOnInit() {
    setTimeout(() => {
      this.smartphoneData = this.baseService.smartphoneData;
      // console.log(this.smartphoneData.smartphoneMessages.length);
    }, 2);


    setInterval(() => {
      this.headerClockFormated = this.formatClockHoursMinutes;
    }, 100);
  }


  get formatClockHoursMinutes() {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();

    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }

  selectApp(app: SmartphoneApp) {
    console.log(app);
    this.selectedApp = app.id;
  }

  isApplicationSelected(app: number) {
    return this.selectedApp === app ? true : false;
  }
}
