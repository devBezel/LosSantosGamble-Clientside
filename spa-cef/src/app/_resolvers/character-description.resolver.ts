import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { CharacterDescription } from '../_models/characterDescription';
import { CharacterService } from '../_services/character.service';
import { AuthService } from '../_services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CharacterDescriptionResolver implements Resolve<CharacterDescription[]> {
    constructor(private characterService: CharacterService, private authService: AuthService, private router: Router) {}

    resolve(): Observable<CharacterDescription[]> {
        return this.characterService.getCharacterDescriptions(this.authService.decodedToken.nameid, this.authService.getCharacterId()).pipe(
            catchError(() => {
                console.log('Problem z wyświetleniem danych');
                this.router.navigate(['']);

                return of(null);
            })
        );
    }
}
