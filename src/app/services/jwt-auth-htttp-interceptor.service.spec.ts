import { TestBed } from '@angular/core/testing';

import { JWTAuthHtttpInterceptorService } from './jwt-auth-htttp-interceptor.service';

describe('JWTAuthHtttpInterceptorService', () => {
  let service: JWTAuthHtttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JWTAuthHtttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
