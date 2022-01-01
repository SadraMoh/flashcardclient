import { TestBed } from '@angular/core/testing';

import { MediaInterceptorService } from './media-interceptor.service';

describe('MediaInterceptorService', () => {
  let service: MediaInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
