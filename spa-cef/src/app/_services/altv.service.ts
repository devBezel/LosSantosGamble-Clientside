import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AltvService {

  constructor() { }

  emit(event: string, object?: any) {
    // @ts-ignore
    alt.emit(event, object);
  }

  on(event: string, func: any) {
    // @ts-ignore
    alt.on(event, func);
  }

}
