import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentHandedinComponent } from './assessment-handedin.component';

describe('AssessmentHandedinComponent', () => {
  let component: AssessmentHandedinComponent;
  let fixture: ComponentFixture<AssessmentHandedinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentHandedinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentHandedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
