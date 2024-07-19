import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDetailsDashboardComponent } from './basic-details-dashboard.component';

describe('BasicDetailsDashboardComponent', () => {
  let component: BasicDetailsDashboardComponent;
  let fixture: ComponentFixture<BasicDetailsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicDetailsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicDetailsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
