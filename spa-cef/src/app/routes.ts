import { Routes } from '@angular/router';
import { LoginPanelComponent } from './_views/login-panel/login-panel.component';
import { AuthGuard } from './_guards/auth.guard';
import { CharactersPanelComponent } from './_views/characters-panel/characters-panel.component';
import { CharacterCardResolver } from './_resolvers/character-card.resolver';
import { CharacterDescriptionPanelComponent } from './_views/character-description-panel/character-description-panel.component';
import { AppComponent } from './app.component';
import { CharacterDescriptionResolver } from './_resolvers/character-description.resolver';

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
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
