import { TestBed } from '@angular/core/testing';

import { BatchListingService } from './batch-listing.service';

describe('BatchListingService', () => {
  let service: BatchListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
