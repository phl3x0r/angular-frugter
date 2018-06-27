import { TestBed, inject } from '@angular/core/testing';

import { FrugtService } from './frugt.service';

describe('FrugtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FrugtService]
    });
  });

  it('should be created', inject([FrugtService], (service: FrugtService) => {
    expect(service).toBeTruthy();
  }));
});
