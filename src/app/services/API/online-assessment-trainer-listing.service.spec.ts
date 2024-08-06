import { TestBed } from '@angular/core/testing';

import { OnlineAssessmentTrainerListingService } from './online-assessment-trainer-listing.service';

describe('OnlineAssessmentTrainerListingService', () => {
  let service: OnlineAssessmentTrainerListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineAssessmentTrainerListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
