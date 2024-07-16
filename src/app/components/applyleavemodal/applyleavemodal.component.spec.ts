import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyleavemodalComponent } from './applyleavemodal.component';

describe('ApplyleavemodalComponent', () => {
  let component: ApplyleavemodalComponent;
  let fixture: ComponentFixture<ApplyleavemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyleavemodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyleavemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
