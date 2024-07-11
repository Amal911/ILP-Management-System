import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { HollowButtonComponent } from '../hollow-button/hollow-button.component';

@Component({
  selector: 'app-applyleavemodal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, HollowButtonComponent],
  templateUrl: './applyleavemodal.component.html',
  styleUrl: './applyleavemodal.component.scss'
})
export class ApplyleavemodalComponent {

  applyLeaveForm: FormGroup;
  trainerPocs: string[] = ['Trainer 1', 'Trainer 2', 'Trainer 3'];
  ldPocs: string[] = ['L&D 1', 'L&D 2', 'L&D 3'];

  constructor(private fb: FormBuilder) {
    this.applyLeaveForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      // email: ['', [Validators.required, Validators.email]],
      days: ['', [Validators.required, Validators.min(1)]],
      date: [''],
      fromDate: [''],
      toDate: [''],
      reason: ['', Validators.required],
      trainerPoc: ['', Validators.required],
      ldPoc: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.onDaysChange();
  }

  onDaysChange() {
    const days = this.applyLeaveForm.get('days')?.value;
    if (days === 1) {
      this.applyLeaveForm.get('date')?.setValidators(Validators.required);
      this.applyLeaveForm.get('fromDate')?.clearValidators();
      this.applyLeaveForm.get('toDate')?.clearValidators();
    } else if (days > 1) {
      this.applyLeaveForm.get('date')?.clearValidators();
      this.applyLeaveForm.get('fromDate')?.setValidators(Validators.required);
      this.applyLeaveForm.get('toDate')?.setValidators(Validators.required);
    } else {
      this.applyLeaveForm.get('date')?.clearValidators();
      this.applyLeaveForm.get('fromDate')?.clearValidators();
      this.applyLeaveForm.get('toDate')?.clearValidators();
    }
    this.applyLeaveForm.get('date')?.updateValueAndValidity();
    this.applyLeaveForm.get('fromDate')?.updateValueAndValidity();
    this.applyLeaveForm.get('toDate')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.applyLeaveForm.valid) {
      // handle form submission
      console.log(this.applyLeaveForm.value);
    }
  }

}
