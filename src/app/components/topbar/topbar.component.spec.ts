import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/pages/assignments/assignments.component.spec.ts
import { AssignmentsComponent } from './assignments.component';

describe('AssignmentsComponent', () => {
  let component: AssignmentsComponent;
  let fixture: ComponentFixture<AssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentsComponent);
========
import { TopbarComponent } from './topbar.component';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopbarComponent);
>>>>>>>> 1bc39fcf97662520cc15506a04ba47beca6106e8:src/app/components/topbar/topbar.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
