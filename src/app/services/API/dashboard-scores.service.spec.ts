import { TestBed } from '@angular/core/testing';

import { DashboardScoresService } from './dashboard-scores.service';

describe('DashboardScoresService', () => {
  let service: DashboardScoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardScoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
