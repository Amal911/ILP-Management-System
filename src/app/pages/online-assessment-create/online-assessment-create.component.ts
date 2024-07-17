import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnlineAssessmentListCardComponent } from '../../components/online-assessment-list-card/online-assessment-list-card.component';
import { SelectDropdownComponent } from '../../components/select-dropdown/select-dropdown.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-online-assessment-create',
  standalone: true,
  imports: [OnlineAssessmentListCardComponent,SelectDropdownComponent,NgFor,FormsModule,ReactiveFormsModule,NgIf],
  templateUrl: './online-assessment-create.component.html',
  styleUrl: './online-assessment-create.component.scss'
})
export class OnlineAssessmentCreateComponent implements OnInit {

  assessmentForm!: FormGroup;
 
  batchControl: FormControl = new FormControl('', Validators.required);
  
  

  pendingAssessments = [
    { title: 'Assessment 1', createdBy: 'Lekshmi A', dueTime: '2024-08-01 10:00 AM', isScheduling: true },
    { title: 'Assessment 2', createdBy: 'Veena', dueTime: '2024-08-05 02:00 PM', isScheduling: true },
    { title: 'Assessment 3', createdBy: 'Lekshmi A', dueTime: '2024-08-09 09:00 AM', isScheduling: true },
  ];

  

  scheduledAssessments = [
    { title: 'Assessment 4', createdBy: 'Lekshmi A', dueTime: '2024-08-15 11:00 AM' },
    { title: 'Assessment 5', createdBy: 'Veena', dueTime: '2024-08-20 01:00 PM' },
    { title: 'Assessment 6', createdBy: 'Lekshmi A', dueTime: '2024-08-25 03:00 PM' }
  ];

  completedAssessments = [
    { title: 'Assessment 7', createdBy: 'Veena', dueTime: '2024-07-10 11:00 AM' },
    { title: 'Assessment 8', createdBy: 'Lekshmi A', dueTime: '2024-07-12 03:00 PM' },
    { title: 'Assessment 9', createdBy: 'Lekshmi A', dueTime: '2024-07-12 03:00 PM' }
  ];
 

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.assessmentForm = this.fb.group({
      title: [{ value: '', disabled: true }],
      testDate: [{ value: '', disabled: true }],
      testTime: [{ value: '', disabled: true }],
      link: [{ value: '', disabled: true }],
      phase: ['', Validators.required],
      module: ['', Validators.required],
      evaluationCriteria: ['', Validators.required],
   
    });
    

    this.assessmentForm.patchValue({
      title: 'Example Title',
      testDate: '2024-07-15',
      testTime: '10:00',
      link: 'https://example.com'
    });
  }

  get phaseControl(): FormControl {
    return this.assessmentForm.get('phase') as FormControl;
  }

  get moduleControl(): FormControl {
    return this.assessmentForm.get('module') as FormControl;
  }

  get evaluationCriteriaControl(): FormControl {
    return this.assessmentForm.get('evaluationCriteria') as FormControl;
  }

 

  onSubmit(): void {
    if (this.assessmentForm.valid) {
     
      console.log('Form values:', {
        title: this.assessmentForm.get('title')?.value,
        testDate: this.assessmentForm.get('testDate')?.value,
        testTime: this.assessmentForm.get('testTime')?.value,
        link: this.assessmentForm.get('link')?.value,
        phase: this.phaseControl.value,
        module: this.moduleControl.value,
        evaluationCriteria: this.evaluationCriteriaControl.value,
       
        
      });

      
     
    } else {
      console.error('Form is invalid. Cannot submit.');
     
      this.assessmentForm.markAllAsTouched();
    }
}
batchSelected(event: Event) {
  const selectedValue = (event.target as HTMLSelectElement).value;
  console.log('Selected Batch:', selectedValue);
}
}
