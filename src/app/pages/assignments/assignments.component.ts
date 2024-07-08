import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SelectDropdownComponent } from '../../components/select-dropdown/select-dropdown.component';
import { NgIf } from '@angular/common';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-assignments',
  standalone: true,
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss'],
  imports: [SidebarComponent, ReactiveFormsModule, SelectDropdownComponent, NgIf, FormsModule]
})
export class AssignmentsComponent implements OnInit {
  assignmentForm!: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.assignmentForm = new FormGroup({
      batch: new FormControl('', Validators.required),
      phase: new FormControl('', Validators.required),
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      evaluationCriteria: new FormControl('', Validators.required),
      module: new FormControl('', Validators.required),
      trainer: new FormControl('', Validators.required),
      submissionRequired: new FormControl('true', Validators.required),
      dueDate: new FormControl('', [Validators.required, this.futureDateValidator])
    });
  }

  get batchControl(): FormControl {
    return this.assignmentForm.get('batch') as FormControl;
  }

  get phaseControl(): FormControl {
    return this.assignmentForm.get('phase') as FormControl;
  }

  get titleControl(): FormControl {
    return this.assignmentForm.get('title') as FormControl;
  }

  get evaluationCriteriaControl(): FormControl {
    return this.assignmentForm.get('evaluationCriteria') as FormControl;
  }

  get moduleControl(): FormControl {
    return this.assignmentForm.get('module') as FormControl;
  }

  get trainerControl(): FormControl {
    return this.assignmentForm.get('trainer') as FormControl;
  }

  get dueDateControl(): FormControl {
    return this.assignmentForm.get('dueDate') as FormControl;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.assignmentForm.valid) {
      console.log(this.assignmentForm.value);
    } else {
      this.validateAllFormFields(this.assignmentForm);
    }
  }

  onCancel(): void {
    this.submitted = false;
    this.assignmentForm.reset();
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      return { futureDate: true };
    }
    return null;
  }
}
