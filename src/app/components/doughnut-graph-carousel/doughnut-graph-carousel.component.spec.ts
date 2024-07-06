import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutGraphCarouselComponent } from './doughnut-graph-carousel.component';

describe('DoughnutGraphCarouselComponent', () => {
  let component: DoughnutGraphCarouselComponent;
  let fixture: ComponentFixture<DoughnutGraphCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoughnutGraphCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoughnutGraphCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
