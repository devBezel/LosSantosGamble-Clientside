import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../_models/character';
import { CharacterDescription } from '../_models/characterDescription';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  baseUrl = environment.baseUrl + 'character';

  constructor(private http: HttpClient) { }

  getAccountCharacters(userId: number): Observable<Character[]> {
    return this.http.get<Character[]>(this.baseUrl + '/list/' + userId);
  }

  getCharacterDescriptions(userId: number, characterId: number) {
    return this.http.get<CharacterDescription[]>(this.baseUrl + '/description/' + userId + '/' + characterId);
  }
}
