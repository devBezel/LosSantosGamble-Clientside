import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_modules/material/material.module';
import { LoginPanelComponent } from './_views/login-panel/login-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guards/auth.guard';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { CharactersPanelComponent } from './_views/characters-panel/characters-panel.component';
import { CharacterService } from './_services/character.service';
import { CharacterCardResolver } from './_resolvers/character-card.resolver';
import { CharacterDescriptionPanelComponent } from './_views/character-description-panel/character-description-panel.component';
import { CharacterDescriptionResolver } from './_resolvers/character-description.resolver';
import { AltvService } from './_services/altv.service';
import { CharacterCreatorPanelComponent } from './_views/character-creator-panel/character-creator-panel.component';
// tslint:disable-next-line:max-line-length
import { CharacterCreatorCardComponent } from './_views/character-creator-panel/elements/character-creator-card/character-creator-card.component';
// tslint:disable-next-line:max-line-length
import { CharacterCreatorHairComponent } from './_views/character-creator-panel/elements/character-creator-hair/character-creator-hair.component';
// tslint:disable-next-line:max-line-length
import { CharacterCreatorColorPaletteComponent } from './_views/character-creator-panel/elements/character-creator-color-palette/character-creator-color-palette.component';
// tslint:disable-next-line:max-line-length
import { CharacterCreatorFaceComponent } from './_views/character-creator-panel/elements/character-creator-face/character-creator-face.component';

// tslint:disable-next-line:max-line-length
import { CharacterCreatorLegsComponent } from './_views/character-creator-panel/elements/character-creator-legs/character-creator-legs.component';
import { CharacterLookResolver } from './_resolvers/character-look.resolver';
// tslint:disable-next-line:max-line-length
import { CharacterCreatorTorsoComponent } from './_views/character-creator-panel/elements/character-creator-torso/character-creator-torso.component';

// tslint:disable-next-line:max-line-length
import { CharacterCreatorShirtComponent } from './_views/character-creator-panel/elements/character-creator-shirt/character-creator-shirt.component';

// tslint:disable-next-line:max-line-length
import { CharacterCreatorHatComponent } from './_views/character-creator-panel/elements/character-creator-hat/character-creator-hat.component';
// tslint:disable-next-line:max-line-length
import { CharacterCreatorGlassesComponent } from './_views/character-creator-panel/elements/character-creator-glasses/character-creator-glasses.component';
// tslint:disable-next-line:max-line-length
import { CharacterCreatorFaceDetailComponent } from './_views/character-creator-panel/elements/character-creator-face-detail/character-creator-face-detail.component';

// tslint:disable-next-line:max-line-length
import { CharacterCreatorBeardComponent } from './_views/character-creator-panel/elements/character-creator-beard/character-creator-beard.component';
import { NotifyService } from './_services/notify.service';
import { BaseService } from './_services/base.service';
import { VehiclePanelComponent } from './_views/vehicle-panel/vehicle-panel.component';
import { VehicleCardComponent } from './_views/vehicle-panel/elements/vehicle-card/vehicle-card.component';
import { AtmPanelComponent } from './_views/atm-panel/atm-panel.component';
import { BusStopPanelComponent } from './_views/bus-stop-panel/bus-stop-panel.component';
import { BusStationComponent } from './_views/bus-stop-panel/elements/bus-station/bus-station.component';
import { VehicleInteractionComponent } from './_views/vehicle-interaction/vehicle-interaction.component';
// tslint:disable-next-line:max-line-length
import { IntoVehicleInteractionComponent } from './_views/vehicle-interaction/elements/into-vehicle-interaction/into-vehicle-interaction.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { VehicleSpeedometrComponent } from './_views/vehicle-speedometr/vehicle-speedometr.component';
import { InventoryPanelComponent } from './_views/inventory-panel/inventory-panel.component';
import { DoorsPanelComponent } from './_views/building-panel/doors-panel/doors-panel.component';
import { BuildingPanelComponent } from './_views/building-panel/building-panel.component';
import { BuildingEditorDialogComponent } from './_views/building-panel/elements/building-editor-dialog/building-editor-dialog.component';
import { BuildingSaleDialogComponent } from './_views/building-panel/elements/building-sale-dialog/building-sale-dialog.component';
// tslint:disable-next-line:max-line-length
import { BuildingWithdrawBalanceDialogComponent } from './_views/building-panel/elements/building-withdraw-balance-dialog/building-withdraw-balance-dialog.component';
// tslint:disable-next-line:max-line-length
import { BuildingMagazineDialogComponent } from './_views/building-panel/elements/building-magazine-dialog/building-magazine-dialog.component';
// tslint:disable-next-line:max-line-length
import { BuildingPlayersOnlineDialogComponent } from './_views/building-panel/elements/building-players-online-dialog/building-players-online-dialog.component';
import { BaseOverlayComponent } from './_views/base-overlay/base-overlay.component';
import { PlayerHudComponent } from './_views/base-overlay/player-hud/player-hud.component';
import { BuildingTenantsDialogComponent } from './_views/building-panel/elements/building-tenants-dialog/building-tenants-dialog.component';
import { ShopPanelComponent } from './_views/shop-panel/shop-panel.component';
import { BuyOfferShopDialogComponent } from './_views/shop-panel/elements/buy-offer-shop-dialog/buy-offer-shop-dialog.component';
import { VehicleTrunkComponent } from './_views/vehicle-trunk/vehicle-trunk.component';
import { InteractionDotComponent } from './_views/interaction-dot/interaction-dot.component';
import { OfferableItemPanelComponent } from './_views/inventory-panel/elements/offerable-item-panel/offerable-item-panel.component';
import { OfferItemRequestComponent } from './_views/offer-item-request/offer-item-request.component';
import { GroupPanelComponent } from './_views/group-panel/group-panel.component';
import { GroupPanelProfileComponent } from './_views/group-panel/elements/group-panel-profile/group-panel-profile.component';
import { GroupPanelWorkersComponent } from './_views/group-panel/elements/group-panel-workers/group-panel-workers.component';
import { GroupPanelVehiclesComponent } from './_views/group-panel/elements/group-panel-vehicles/group-panel-vehicles.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPanelComponent,
    CharactersPanelComponent,
    CharacterDescriptionPanelComponent,
    CharacterCreatorPanelComponent,
    CharacterCreatorCardComponent,
    CharacterCreatorHairComponent,
    CharacterCreatorColorPaletteComponent,
    CharacterCreatorFaceComponent,
    CharacterCreatorLegsComponent,
    CharacterCreatorTorsoComponent,
    CharacterCreatorShirtComponent,
    CharacterCreatorHatComponent,
    CharacterCreatorGlassesComponent,
    CharacterCreatorFaceDetailComponent,
    CharacterCreatorBeardComponent,
    VehiclePanelComponent,
    VehicleCardComponent,
    AtmPanelComponent,
    BusStopPanelComponent,
    BusStationComponent,
    VehicleInteractionComponent,
    IntoVehicleInteractionComponent,
    VehicleSpeedometrComponent,
    InventoryPanelComponent,
    DoorsPanelComponent,
    BuildingPanelComponent,
    BuildingEditorDialogComponent,
    BuildingSaleDialogComponent,
    BuildingWithdrawBalanceDialogComponent,
    BuildingMagazineDialogComponent,
    BuildingPlayersOnlineDialogComponent,
    BaseOverlayComponent,
    PlayerHudComponent,
    BuildingTenantsDialogComponent,
    ShopPanelComponent,
    BuyOfferShopDialogComponent,
    VehicleTrunkComponent,
    InteractionDotComponent,
    OfferableItemPanelComponent,
    OfferItemRequestComponent,
    GroupPanelComponent,
    GroupPanelProfileComponent,
    GroupPanelWorkersComponent,
    GroupPanelVehiclesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    // AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        // tslint:disable-next-line:object-literal-shorthand
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000', '51.38.142.78:3000'],
        blacklistedRoutes: ['localhost:5000/api/auth', '51.38.142.78:3000/api/auth']
      }
    }),
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-bottom-center',
      progressBar: true
    }),
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [
    BuildingEditorDialogComponent,
    BuildingSaleDialogComponent,
    BuildingWithdrawBalanceDialogComponent,
    BuildingMagazineDialogComponent,
    BuildingPlayersOnlineDialogComponent,
    BuildingTenantsDialogComponent,
    BuyOfferShopDialogComponent,
    OfferableItemPanelComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    CharacterService,
    CharacterCardResolver,
    CharacterDescriptionResolver,
    AltvService,
    CharacterLookResolver,
    NotifyService,
    BaseService,
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
