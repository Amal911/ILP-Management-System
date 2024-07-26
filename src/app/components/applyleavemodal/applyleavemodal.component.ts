import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { HollowButtonComponent } from '../hollow-button/hollow-button.component';

declare const bootstrap: any;

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
    },{
      validators: [this.dateRangeValidator()]
    });
  }

  ngOnInit(): void {
    this.applyLeaveForm.get('days')?.valueChanges.subscribe(() => this.onDaysChange());
  }

  onDaysChange() {
    const days = this.applyLeaveForm.get('days')?.value;
    if (days === 1) {
      this.applyLeaveForm.get('date')?.setValidators([Validators.required, this.futureDateValidator()]);
      this.applyLeaveForm.get('fromDate')?.clearValidators();
      this.applyLeaveForm.get('toDate')?.clearValidators();
    } else if (days > 1) {
      this.applyLeaveForm.get('date')?.clearValidators();
      this.applyLeaveForm.get('fromDate')?.setValidators([Validators.required, this.futureDateValidator(), this.dateRangeValidator()]);
      this.applyLeaveForm.get('toDate')?.setValidators([Validators.required, this.futureDateValidator(), this.dateRangeValidator()]);
    } else {
      this.applyLeaveForm.get('date')?.clearValidators();
      this.applyLeaveForm.get('fromDate')?.clearValidators();
      this.applyLeaveForm.get('toDate')?.clearValidators();
    }
    this.applyLeaveForm.get('date')?.updateValueAndValidity();
    this.applyLeaveForm.get('fromDate')?.updateValueAndValidity();
    this.applyLeaveForm.get('toDate')?.updateValueAndValidity();
  }

  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentDate = new Date();
      const controlDate = new Date(control.value);
      return controlDate > currentDate ? null : { futureDate: true };
    };
  }

  dateRangeValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const days = group.get('days')?.value;
      if (days > 1) {
        const fromDate = new Date(group.get('fromDate')?.value);
        const toDate = new Date(group.get('toDate')?.value);
        if (fromDate && toDate) {
          const dateDiff = Math.floor((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
          return dateDiff === days ? null : { durationMismatch: true };
        }
      }
      return null;
    };
  }

  

  onSubmit() {
    if (this.applyLeaveForm.valid) {
      console.log(this.applyLeaveForm.value);
      this.applyLeaveForm.reset();
      const modalElement = document.getElementById('applyLeaveModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      }
    } else {
      this.applyLeaveForm.markAllAsTouched();
      console.log("not validated")
    }
  }

}

