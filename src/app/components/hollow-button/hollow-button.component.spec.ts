import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HollowButtonComponent } from './hollow-button.component';

describe('HollowButtonComponent', () => {
  let component: HollowButtonComponent;
  let fixture: ComponentFixture<HollowButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HollowButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HollowButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
