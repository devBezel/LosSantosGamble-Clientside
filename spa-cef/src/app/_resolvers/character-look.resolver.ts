import { Resolve, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { CharacterService } from '../_services/character.service';
import { Injectable } from '@angular/core';
import { CharacterLook } from '../_models/characterLook';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CharacterLookResolver implements Resolve<CharacterLook> {
    constructor(private characterService: CharacterService, private authService: AuthService, private router: Router) { }

    resolve(): Observable<CharacterLook> {
        return this.characterService.getCharacterLook(this.authService.decodedToken.nameid, this.authService.getCharacterId()).pipe(
            catchError(() => {
                console.log('Problem z wyświetleniem danych');
                this.router.navigate(['']);

                return of(null);
            })
        );
    }
}
