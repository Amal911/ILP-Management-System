import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardScorecardComponent } from './dashboard-scorecard.component';

describe('DashboardScorecardComponent', () => {
  let component: DashboardScorecardComponent;
  let fixture: ComponentFixture<DashboardScorecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardScorecardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardScorecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
