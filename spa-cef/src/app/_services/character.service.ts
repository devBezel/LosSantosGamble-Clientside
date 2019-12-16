import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../_models/character';
import { CharacterDescription } from '../_models/characterDescription';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  baseUrl = environment.baseUrl + 'character';


  constructor(private http: HttpClient) { }

  getAccountCharacters(userId: number): Observable<Character[]> {
    return this.http.get<Character[]>(this.baseUrl + '/list/' + userId);
  }

  getCharacterDescriptions(userId: number, characterId: number): Observable<CharacterDescription[]> {
    return this.http.get<CharacterDescription[]>(this.baseUrl + '/description/' + userId + '/' + characterId);
  }

  createCharacterDescription(userId: number, description: CharacterDescription) {
    console.log(this.baseUrl + '/description/add/' + userId + '/', description);
    return this.http.post(this.baseUrl + '/description/add/' + userId + '/', description);
  }

  deleteCharacterDescription(userId: number, description: CharacterDescription) {
    return this.http.delete(this.baseUrl + '/description/delete/' + userId + '/' + description.id);
  }
}
