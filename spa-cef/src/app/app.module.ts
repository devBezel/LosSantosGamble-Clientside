import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
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
import { FormsModule } from '@angular/forms';
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
    VehicleCardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    JwtModule.forRoot({
      config: {
        // tslint:disable-next-line:object-literal-shorthand
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    }),
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-bottom-center',
      progressBar: true
    }),
    RouterModule.forRoot(appRoutes)
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
