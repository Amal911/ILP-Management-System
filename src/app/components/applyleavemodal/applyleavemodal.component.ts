import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { HollowButtonComponent } from '../hollow-button/hollow-button.component';
import { UserService } from '../../services/user.service';
import { LeaveService } from '../../services/API/leave.service';

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
  admins: any[] = [];
  trainers: any[] = [];
  // selectedPocNames: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private leaveService: LeaveService) {
    this.applyLeaveForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      // email: ['', [Validators.required, Validators.email]],
      days: ['', [Validators.required, Validators.min(1)]],
      date: [''],
      fromDate: [''],
      toDate: [''],
      reason: ['', Validators.required],
      // pocIds: [[], Validators.required],
      trainerPoc: ['', Validators.required],
      ldPoc: ['', Validators.required],
      description: ['', Validators.required]
    }, {
      validators: [this.dateRangeValidator()]
    });
  }

  ngOnInit(): void {
    this.applyLeaveForm.get('days')?.valueChanges.subscribe(() => this.onDaysChange());
    this.userService.getUsersRoles().subscribe(data => {
      this.admins = data.admins;
      this.trainers = data.trainers;
    });
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
      let startDate: string | null = null;
      let endDate: string | null = null;
      let singledate: string | null = null;

      const days = this.applyLeaveForm.get('days')?.value;
      const dateValue = this.applyLeaveForm.get('date')?.value;
      const fromDateValue = this.applyLeaveForm.get('fromDate')?.value;
      const toDateValue = this.applyLeaveForm.get('toDate')?.value;

      if (days === 1 && dateValue) {
        singledate = new Date(`${dateValue}T00:00:00Z`).toISOString();
        startDate = endDate = new Date(0).toISOString();
      } 
      else if (days > 1 && fromDateValue && toDateValue) {
        startDate = new Date(`${fromDateValue}T00:00:00Z`).toISOString();
        endDate = new Date(`${toDateValue}T00:00:00Z`).toISOString();
        singledate = new Date(0).toISOString();
      }

      const formData = {
        name: this.applyLeaveForm.get('name')?.value,
        numofDays: this.applyLeaveForm.get('days')?.value,
        leaveDate: singledate,
        leaveDateFrom: startDate,
        leaveDateTo: endDate,
        reason: this.applyLeaveForm.get('reason')?.value,
        description: this.applyLeaveForm.get('description')?.value,
        pocIds: [
          0
        ]
      }

      const pocIds: number[] = [];
      if (this.applyLeaveForm.get('trainerPoc')?.value) {
        pocIds.push(this.applyLeaveForm.get('trainerPoc')?.value);
      }
      if (this.applyLeaveForm.get('ldPoc')?.value) {
        pocIds.push(this.applyLeaveForm.get('ldPoc')?.value);
      }
      // const uniquePocIds = [...new Set(pocIds)];      // Ensure pocIds is unique
      formData.pocIds = [...new Set(pocIds)];

      console.log(formData);
      this.leaveService.postLeaveRequest(formData).subscribe(
        response => {
          console.log('Leave request created successfully', response);
          this.applyLeaveForm.reset();
          const modalElement = document.getElementById('applyLeaveModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
          }
        },
        error => {
          console.error('Error creating leave request', error);
        }
      );
    } else {
      this.applyLeaveForm.markAllAsTouched();
    }
  }
}


