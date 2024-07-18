import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestActivityDashboardComponent } from './latest-activity-dashboard.component';

describe('LatestActivityDashboardComponent', () => {
  let component: LatestActivityDashboardComponent;
  let fixture: ComponentFixture<LatestActivityDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestActivityDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestActivityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
