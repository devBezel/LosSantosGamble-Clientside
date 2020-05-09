import { Routes } from '@angular/router';
import { LoginPanelComponent } from './_views/login-panel/login-panel.component';
import { AuthGuard } from './_guards/auth.guard';
import { CharactersPanelComponent } from './_views/characters-panel/characters-panel.component';
import { CharacterCardResolver } from './_resolvers/character-card.resolver';
import { CharacterDescriptionPanelComponent } from './_views/character-description-panel/character-description-panel.component';
import { AppComponent } from './app.component';
import { CharacterDescriptionResolver } from './_resolvers/character-description.resolver';
import { CharacterCreatorPanelComponent } from './_views/character-creator-panel/character-creator-panel.component';
import { CharacterLookResolver } from './_resolvers/character-look.resolver';
import { VehiclePanelComponent } from './_views/vehicle-panel/vehicle-panel.component';
import { AtmPanelComponent } from './_views/atm-panel/atm-panel.component';
import { BusStopPanelComponent } from './_views/bus-stop-panel/bus-stop-panel.component';
import { VehicleInteractionComponent } from './_views/vehicle-interaction/vehicle-interaction.component';
// tslint:disable-next-line:max-line-length
import { IntoVehicleInteractionComponent } from './_views/vehicle-interaction/elements/into-vehicle-interaction/into-vehicle-interaction.component';
import { VehicleSpeedometrComponent } from './_views/vehicle-speedometr/vehicle-speedometr.component';
import { InventoryPanelComponent } from './_views/inventory-panel/inventory-panel.component';
import { DoorsPanelComponent } from './_views/building-panel/doors-panel/doors-panel.component';
import { BuildingPanelComponent } from './_views/building-panel/building-panel.component';
import { BaseOverlayComponent } from './_views/base-overlay/base-overlay.component';
import { ShopPanelComponent } from './_views/shop-panel/shop-panel.component';
import { VehicleTrunkComponent } from './_views/vehicle-trunk/vehicle-trunk.component';
import { GroupPanelComponent } from './_views/group-panel/group-panel.component';
import { ObjectEditorOverlayComponent } from './_views/object_editor/object-editor-overlay/object-editor-overlay.component';
import { InteractionMenuComponent } from './_views/interaction-menu/interaction-menu.component';
import { AfkSystemComponent } from './_views/afk-system/afk-system.component';
import { SearchEntityPanelComponent } from './_views/group-systems/search-entity-panel/search-entity-panel.component';
import { ScoreboardPanelComponent } from './_views/scoreboard-panel/scoreboard-panel.component';
import { OfferPanelComponent } from './_views/offer-panel/offer-panel.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginPanelComponent },
    { path: '', component: AppComponent },
    { path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'characters', component: CharactersPanelComponent, resolve: { characters: CharacterCardResolver } },
            { path: 'character/description', component: CharacterDescriptionPanelComponent
                                            , resolve: { descriptions: CharacterDescriptionResolver } },
            { path: 'character/creator', component: CharacterCreatorPanelComponent, resolve: { characterLook: CharacterLookResolver } },
            { path: 'character/vehicle', component: VehiclePanelComponent  },
            { path: 'atm', component: AtmPanelComponent },
            { path: 'bus', component:  BusStopPanelComponent},
            { path: 'vehicle/interaction', component: VehicleInteractionComponent },
            { path: 'vehicle/interaction/into', component: IntoVehicleInteractionComponent },
            { path: 'inventory', component: InventoryPanelComponent },
            { path: 'doors', component: DoorsPanelComponent },
            { path: 'building/manage', component: BuildingPanelComponent },
            { path: 'shop', component: ShopPanelComponent },
            { path: 'vehicle/trunk', component: VehicleTrunkComponent },
            { path: 'offer/request', component: OfferPanelComponent },
            { path: 'group/panel', component: GroupPanelComponent },
            { path: 'object/editor/overlay', component: ObjectEditorOverlayComponent },
            { path: 'interaction/menu', component: InteractionMenuComponent },
            { path: 'afk', component: AfkSystemComponent },
            { path: 'search/entity', component: SearchEntityPanelComponent },
            { path: 'scoreboard', component: ScoreboardPanelComponent }
            // { path: 'player/hud', component: PlayerHudComponent }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
