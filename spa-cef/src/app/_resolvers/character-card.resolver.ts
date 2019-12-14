import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { CharacterService } from '../_services/character.service';
import { AuthService } from '../_services/auth.service';
import { Character } from '../_models/character';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CharacterCardResolver implements Resolve<Character[]> {
    constructor(private characterService: CharacterService, private authService: AuthService, private router: Router) {}

    resolve(): Observable<Character[]> {
        return this.characterService.getAccountCharacters(this.authService.decodedToken.nameid).pipe(
            catchError(() => {
                console.log('Problem z wyświetleniem danych');
                this.router.navigate(['']);

                return of(null);
            })
        );
    }
}
