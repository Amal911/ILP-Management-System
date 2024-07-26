import { TestBed } from '@angular/core/testing';

import { SessionAttendanceService } from './session-attendance.service';

describe('SessionAttendanceService', () => {
  let service: SessionAttendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionAttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
