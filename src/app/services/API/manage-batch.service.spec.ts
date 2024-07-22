import { TestBed } from '@angular/core/testing';

import { ManageBatchService } from './manage-batch.service';

describe('ManageBatchService', () => {
  let service: ManageBatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageBatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
