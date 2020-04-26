import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../_models/character';
import { CharacterDescription } from '../_models/characterDescription';
import { map } from 'rxjs/internal/operators/map';
import { CharacterLook } from '../_models/characterLook';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  baseUrl = environment.hamachiLocalUrl + 'character';


  constructor(private http: HttpClient) { }

  sendHeader(): HttpHeaders {
    return new HttpHeaders({ Authorization : 'Bearer ' + localStorage.getItem('token')});
  }

  getAccountCharacters(userId: number): Observable<Character[]> {
    // const headers = new HttpHeaders({ Authorization : 'Bearer ' + localStorage.getItem('token')});
    return this.http.get<Character[]>(this.baseUrl + '/list/' + userId, { headers: this.sendHeader() });
  }

  getCharacterLook(userId: number, characterId: number): Observable<CharacterLook> {
    return this.http.get<CharacterLook>(this.baseUrl + '/look/' + userId + '/' + characterId, { headers: this.sendHeader() });
  }

  getCharacterDescriptions(userId: number, characterId: number): Observable<CharacterDescription[]> {
    console.log(this.baseUrl + '/description/' + userId + '/' + characterId);
    return this.http.get<CharacterDescription[]>(this.baseUrl + '/description/' + userId + '/' + characterId,
    { headers: this.sendHeader() });
  }

  createCharacterDescription(userId: number, description: CharacterDescription) {
    console.log(this.baseUrl + '/description/add/' + userId + '/', description);
    return this.http.post(this.baseUrl + '/description/add/' + userId + '/', description, { headers: this.sendHeader() });
  }

  deleteCharacterDescription(userId: number, description: CharacterDescription) {
    return this.http.delete(this.baseUrl + '/description/delete/' + userId + '/' + description.id, { headers: this.sendHeader() });
  }

  saveCharacterLook(userId: number, characterId: number, characterLook: CharacterLook) {
    return this.http.post(this.baseUrl + '/save/character/' + userId + '/' + characterId, characterLook, { headers: this.sendHeader() });
  }
}
