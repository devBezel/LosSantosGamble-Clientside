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
            { path: 'atm', component: AtmPanelComponent }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
