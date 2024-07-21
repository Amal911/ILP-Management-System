import { TestBed } from '@angular/core/testing';

import { CreateCriteriaService } from './create-criteria.service';

describe('CreateCriteriaService', () => {
  let service: CreateCriteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCriteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
