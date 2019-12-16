/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AltvService } from './altv.service';

describe('Service: Altv', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AltvService]
    });
  });

  it('should ...', inject([AltvService], (service: AltvService) => {
    expect(service).toBeTruthy();
  }));
});
