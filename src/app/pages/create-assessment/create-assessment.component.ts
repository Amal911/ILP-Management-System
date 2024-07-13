import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { SelectDropdownComponent } from '../../components/select-dropdown/select-dropdown.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-assessment',
  standalone: true,
  imports: [ReactiveFormsModule, SelectDropdownComponent,NgIf,FormsModule],
  templateUrl: './create-assessment.component.html',
  styleUrl: './create-assessment.component.scss'
})
export class CreateAssessmentComponent  implements OnInit {
  assessmentForm!: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.assessmentForm = new FormGroup({
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
    return this.assessmentForm.get('batch') as FormControl;
  }

  get phaseControl(): FormControl {
    return this.assessmentForm.get('phase') as FormControl;
  }

  get titleControl(): FormControl {
    return this.assessmentForm.get('title') as FormControl;
  }

  get evaluationCriteriaControl(): FormControl {
    return this.assessmentForm.get('evaluationCriteria') as FormControl;
  }

  get moduleControl(): FormControl {
    return this.assessmentForm.get('module') as FormControl;
  }

  get trainerControl(): FormControl {
    return this.assessmentForm.get('trainer') as FormControl;
  }

  get dueDateControl(): FormControl {
    return this.assessmentForm.get('dueDate') as FormControl;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.assessmentForm.valid) {
      console.log(this.assessmentForm.value);
    } else {
      this.validateAllFormFields(this.assessmentForm);
      console.log("Invalid Form")
    }
  }

  onCancel(): void {
    this.submitted = false;
    this.assessmentForm.reset();
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
