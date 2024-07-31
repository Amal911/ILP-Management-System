import { TestBed } from '@angular/core/testing';

import { AllBatchesService } from './all-batches.service';

describe('AllBatchesService', () => {
  let service: AllBatchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllBatchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
