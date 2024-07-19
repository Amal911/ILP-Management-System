import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriawiseGraphDashboardComponent } from './criteriawise-graph-dashboard.component';

describe('CriteriawiseGraphDashboardComponent', () => {
  let component: CriteriawiseGraphDashboardComponent;
  let fixture: ComponentFixture<CriteriawiseGraphDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriteriawiseGraphDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriteriawiseGraphDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
