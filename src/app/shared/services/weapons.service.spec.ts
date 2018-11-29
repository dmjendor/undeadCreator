import { TestBed, inject } from '@angular/core/testing';

import { WeaponsService } from './weapons.service';

describe('WeaponsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeaponsService]
    });
  });

  it('should be created', inject([WeaponsService], (service: WeaponsService) => {
    expect(service).toBeTruthy();
  }));
});
