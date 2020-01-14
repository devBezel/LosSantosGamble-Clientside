import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AltvService {

  constructor() { }

  emit(event: string, object?: any, args?: any, argsTwo?: any, argsThree?: any, argsFour?: any, argsFive?: any) {
    // @ts-ignore
    alt.emit(event, object, args, argsTwo, argsThree, argsFour, argsFive);
  }

  public on(name: string, callback: CallableFunction) {
    // @ts-ignore
    // tslint:disable-next-line:no-string-literal
    this.isAltDefined() ? window['alt'].on(name, callback) : console.log(`AltV service: OnEvent: ${name} with params ${callback}`);
  }

  private isAltDefined() {
    // tslint:disable-next-line:no-string-literal
    return window['alt'] !== undefined;
  }

}
