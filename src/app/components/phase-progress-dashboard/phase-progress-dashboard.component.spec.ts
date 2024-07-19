import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseProgressDashboardComponent } from './phase-progress-dashboard.component';

describe('PhaseProgressDashboardComponent', () => {
  let component: PhaseProgressDashboardComponent;
  let fixture: ComponentFixture<PhaseProgressDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhaseProgressDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhaseProgressDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
