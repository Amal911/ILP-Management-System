import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutGraphChartComponent } from './doughnut-graph-chart.component';

describe('DoughnutGraphChartComponent', () => {
  let component: DoughnutGraphChartComponent;
  let fixture: ComponentFixture<DoughnutGraphChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoughnutGraphChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoughnutGraphChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
