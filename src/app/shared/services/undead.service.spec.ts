import { TestBed, inject } from '@angular/core/testing';

import { UndeadService } from './undead.service';

describe('UndeadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UndeadService]
    });
  });

  it('should be created', inject([UndeadService], (service: UndeadService) => {
    expect(service).toBeTruthy();
  }));
});
