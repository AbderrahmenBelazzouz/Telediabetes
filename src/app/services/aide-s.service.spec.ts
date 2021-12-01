import { TestBed } from '@angular/core/testing';

import { AideSService } from './aide-s.service';

describe('AideSService', () => {
  let service: AideSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AideSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
