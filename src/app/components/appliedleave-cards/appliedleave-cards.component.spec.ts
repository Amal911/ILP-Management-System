import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedleaveCardsComponent } from './appliedleave-cards.component';

describe('AppliedleaveCardsComponent', () => {
  let component: AppliedleaveCardsComponent;
  let fixture: ComponentFixture<AppliedleaveCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppliedleaveCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppliedleaveCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
