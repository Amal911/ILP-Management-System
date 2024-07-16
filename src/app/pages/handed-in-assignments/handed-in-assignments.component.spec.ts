import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandedInAssignmentsComponent } from './handed-in-assignments.component';

describe('HandedInAssignmentsComponent', () => {
  let component: HandedInAssignmentsComponent;
  let fixture: ComponentFixture<HandedInAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandedInAssignmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandedInAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
