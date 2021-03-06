import { Injectable, NgZone } from '@angular/core';
import { AltvService } from './altv.service';
import { NotifyService } from './notify.service';
import { Router } from '@angular/router';
import { Vehicle } from '../_models/vehicle';
import { Observable } from 'rxjs';
import { BusStop } from '../_models/busStop';
import { BusStopStation } from '../_models/busStopStation';
import { Item } from '../_models/item';
import { Building } from '../_models/building';
import { Character } from '../_models/character';
import { BuildingTenant } from '../_models/buildingTenant';
import { ShopAssortment } from '../_models/shopAssortment';
import { Group } from '../_models/group';
import { GroupData } from '../_models/GroupData';
import { InteractionCef } from '../_models/interactionCef';
import { ScoreboardPlayer } from '../_models/scoreboardPlayer';
import { JobEntityModel } from '../_models/jobEntityModel';
import { WarehouseOrderModel } from '../_models/warehouseOrderModel';
import { JobType } from '../_enums/JobType';
import { SmartphoneMessageModel } from '../_models/smartphoneMessageModel';
import { SmartphoneRecentCallModel } from '../_models/smartphoneRecentCallModel';
import { SmartphoneContactModel } from '../_models/smartphoneContactModel';
import { SmartphoneData } from '../_models/smartphoneData';
import { SmartphoneCallModel } from '../_models/smartphoneCallModel';
import { SmartphoneIncomingCallModel } from '../_models/smartphoneIncomingCallModel';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  hudInformation: Character;
  hasPremium: boolean;
  vehicleList: Vehicle[];
  userAtmInformation: { name: string, surname: string, money: number, bank: number };
  busStopInformation: BusStop;
  busStationsInformation: BusStopStation[];
  inventoryItems: Item[];
  enterBuildingData: { charge: number, name: string, enter: boolean, isCharacterOwner: boolean, isCharacterTenant: boolean };
  buildingData: {
    building: Building, buildingItems: Item[], playerItems: Item[],
    playersInBuilding: { id: number, name: string }[], tenant: BuildingTenant
  };
  shopData: ShopAssortment[];
  trunkData: { characterItem: Item[], vehicleItem: Item[] };
  requestOffer: { titleOffer: string, senderId: number, offerType: number, index: number, cost: number };
  groupData: GroupData;
  interactionMenuData: InteractionCef[];
  searchEntityItems: Item[];
  scoreboardData?: { scoreboardData?: ScoreboardPlayer[], playersCount?: number };
  vehicleInfo: { vehicle: Vehicle, upgrades: Item[] };
  casualJobData: { playerWorking: boolean, data: JobEntityModel };
  warehouseOrders: WarehouseOrderModel[];
  jobsData: { currentJob: JobType, jobs: JobEntityModel[] };
  smartphoneData: SmartphoneData;

  constructor(private altvService: AltvService, private ngZone: NgZone, private notify: NotifyService,
              private router: Router) {
    this.showNotifySuccess();
    this.showNotifyError();
    this.showNotifyWarning();
    this.redirectToPage();

    this.altvService.on('hud:playerInformation', async (hudInformation: Character) => {
      await this.ngZone.run(async () => { this.hudInformation = hudInformation; });
    });

    this.altvService.on('cef:descriptionHasPremium', async (hasPrem: boolean) => {
      await this.ngZone.run(async () => { this.hasPremium = hasPrem; });
    });

    this.altvService.on('cef:vehicleList', async (vehicles: Vehicle[]) => {
      await this.ngZone.run(async () => { this.vehicleList = vehicles; console.log(this.vehicleList); });
    });

    this.altvService.on('cef:atmInformation', async (atm: { name: string, surname: string, money: number, bank: number }) => {
      await this.ngZone.run(async () => { this.userAtmInformation = atm; });
    });

    this.altvService.on('cef:busInformation', async (busInformation: BusStop, busStationsInformation: BusStopStation[]) => {
      await this.ngZone.run(async () => {
        this.busStopInformation = busInformation;
        this.busStationsInformation = busStationsInformation;
      });
    });

    this.altvService.on('inventory:items', async (items: Item[]) => {
      await this.ngZone.run(async () => { this.inventoryItems = items; });
    });

    this.altvService.on('building:request', async (requestEnter: {
      charge: number, name: string, enter: boolean,
      isCharacterOwner: boolean, isCharacterTenant: boolean
    }) => {
      await this.ngZone.run(async () => {
        this.enterBuildingData = requestEnter;
      });
    });

    this.altvService.on('building:data', async (buildingData: Building, buildingItemsEvent: Item[], playerItemsEvent: Item[],
                                                playersInBuildingEvent: any[], buildingTenant: BuildingTenant) => {
      await this.ngZone.run(async () => {
        this.buildingData = {
          building: buildingData, buildingItems: buildingItemsEvent, playerItems: playerItemsEvent,
          playersInBuilding: playersInBuildingEvent, tenant: buildingTenant
        };
        playersInBuildingEvent.forEach(plr => {
          console.log(plr.name);
        });
      });
    });

    this.altvService.on('shop:data', async (shopAssortment: ShopAssortment[]) => {
      await this.ngZone.run(async () => {
        this.shopData = shopAssortment;
      });
    });

    this.altvService.on('trunk:data', async (trunkDataFromClient: { characterItem: Item[], vehicleItem: Item[] }) => {
      await this.ngZone.run(async () => {
        this.trunkData = trunkDataFromClient;
      });
    });

    this.altvService.on('offer:request', async (requestOffer: {
      titleOffer: string, senderId: number,
      offerType: number, index: number, cost: number
    }) => {
      await this.ngZone.run(async () => {
        this.requestOffer = requestOffer;
      });
    });

    this.altvService.on('group-general:dataGroup', async (groupData: GroupData) => {
      await this.ngZone.run(async () => {
        this.groupData = groupData;
      });
    });

    this.altvService.on('interaction-menu:data', async (interactionData: InteractionCef[]) => {
      await this.ngZone.run(async () => {
        this.interactionMenuData = interactionData;
      });
    });

    this.altvService.on('group:searchPlayer', async (getterItems: Item[]) => {
      await this.ngZone.run(async () => {
        this.searchEntityItems = getterItems;
      });
    });

    this.altvService.on('scoreboard:fetchPlayers', async (scoreboardDataClient?: ScoreboardPlayer[], playersCountClient?: number) => {
      await this.ngZone.run(async () => {
        this.scoreboardData = { scoreboardData: scoreboardDataClient, playersCount: playersCountClient };
      });
    });

    this.altvService.on('vehicle-script:vehicleInfo', async (vehicleInfoFromServer: { vehicle: Vehicle, upgrades: Item[] }) => {
      await this.ngZone.run(async () => {
        this.vehicleInfo = vehicleInfoFromServer;
      });
    });

    this.altvService.on('job:data', async (playerWorking: boolean, data: JobEntityModel) => {
      await this.ngZone.run(async () => {
        // tslint:disable-next-line:object-literal-shorthand
        this.casualJobData = { playerWorking: playerWorking, data: data };
      });
    });

    this.altvService.on('job-courier:currentOrders', async (warehouseOrders: WarehouseOrderModel[]) => {
      await this.ngZone.run(async () => {
        this.warehouseOrders = warehouseOrders;
      });
    });

    this.altvService.on('job-center:data', async (currentPlayerJob: JobType, jobCenterData: JobEntityModel[]) => {
      await this.ngZone.run(async () => {
        this.jobsData = { currentJob: currentPlayerJob, jobs: jobCenterData };
      });
    });

    // tslint:disable-next-line:max-line-length
    this.altvService.on('smartphone:data', async (smartphoneIdClient: number, smartphoneNumberClient: number, smartphoneCreditClient: number, smartphoneMemoryClient: number, smartphoneContactsClient: SmartphoneContactModel[], smartphoneRecentCallsClient: SmartphoneRecentCallModel[], smartphoneMessagesClient: SmartphoneMessageModel[], smartphoneCallClient: SmartphoneCallModel, incomingCallClient: SmartphoneIncomingCallModel) => {
      await this.ngZone.run(async () => {
        // tslint:disable-next-line:max-line-length
        this.smartphoneData = { smartphoneId: smartphoneIdClient, smartphoneNumber: smartphoneNumberClient, smartphoneCredit: smartphoneCreditClient, smartphoneMemory: smartphoneMemoryClient, smartphoneContacts: smartphoneContactsClient, smartphoneRecentCalls: smartphoneRecentCallsClient, smartphoneMessages: smartphoneMessagesClient, smartphoneCall: smartphoneCallClient, incomingCall: incomingCallClient };
      });
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

  showNotifyWarning() {
    this.altvService.on('notify:warning', async (title: string, message: string) => {
      await this.ngZone.run(async () => await this.notify.warning(title, message));
    });
  }

  redirectToPage() {
    this.altvService.on('change:route', async (routeClient: string) => {
      await this.ngZone.run(async () => await this.router.navigate([routeClient]));
    });
  }


}
