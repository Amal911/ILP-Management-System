import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateaccountmodalComponent } from './createaccountmodal.component';

describe('CreateaccountmodalComponent', () => {
  let component: CreateaccountmodalComponent;
  let fixture: ComponentFixture<CreateaccountmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateaccountmodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateaccountmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
