/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GroupRightsService } from './group-rights.service';

describe('Service: GroupRights', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupRightsService]
    });
  });

  it('should ...', inject([GroupRightsService], (service: GroupRightsService) => {
    expect(service).toBeTruthy();
  }));
});
