import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardOverviewDashboardComponent } from './scorecard-overview-dashboard.component';

describe('ScorecardOverviewDashboardComponent', () => {
  let component: ScorecardOverviewDashboardComponent;
  let fixture: ComponentFixture<ScorecardOverviewDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScorecardOverviewDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScorecardOverviewDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
