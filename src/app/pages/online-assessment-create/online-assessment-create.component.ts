import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OnlineAssessmentListCardComponent } from '../../components/online-assessment-list-card/online-assessment-list-card.component';
import { NgFor, NgIf } from '@angular/common';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { OnlineAssessmentTrainerListingService } from '../../services/API/online-assessment-trainer-listing.service';

@Component({
  selector: 'app-online-assessment-create',
  standalone: true,
  imports: [
    OnlineAssessmentListCardComponent,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    DropdownComponent,
  ],
  templateUrl: './online-assessment-create.component.html',
  styleUrl: './online-assessment-create.component.scss',
})
export class OnlineAssessmentCreateComponent implements OnInit {
  selectedAssessmentId: number | null = null;
  assessmentForm!: FormGroup;

  batchControl: FormControl = new FormControl('', Validators.required);

  pendingAssessments:any = [];

  scheduledAssessments = [
    {
      assessmentName: 'Assessment 4',
      createdBy: 'Lekshmi A',
      dueTime: '2024-08-15 11:00 AM',
    },
    {
      assessmentName: 'Assessment 5',
      createdBy: 'Veena',
      dueTime: '2024-08-20 01:00 PM',
    },
    {
      assessmentName: 'Assessment 6',
      createdBy: 'Lekshmi A',
      dueTime: '2024-08-25 03:00 PM',
    },
  ];

  completedAssessments = [
    {
      assessmentName: 'Assessment 7',
      createdBy: 'Veena',
      dueTime: '2024-07-10 11:00 AM',
    },
    {
      assessmentName: 'Assessment 8',
      createdBy: 'Lekshmi A',
      dueTime: '2024-07-12 03:00 PM',
    },
    {
      assessmentName: 'Assessment 9',
      createdBy: 'Lekshmi A',
      dueTime: '2024-07-12 03:00 PM',
    },
  ];

  batches = [
    {
      batchId: 1,
      batchName: 'B-1',
    },
    {
      batchId: 2,
      batchName: 'b-2',
    },
  ];

  get dropDownElements(): string[] {
    return this.batches.map(batch => batch.batchName);
  }

  

  constructor(private fb: FormBuilder,private onlineAssessmentListingService: OnlineAssessmentTrainerListingService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.assessmentForm = this.fb.group({
      title: [{ value: this.pendingAssessments.assessmentName, disabled: true }],
      testDate: [{ value: this.pendingAssessments.startDateTime, disabled: true }],
      testTime: [{ value: this.pendingAssessments.endDateTime, disabled: true }],
      link: [{ value: this.pendingAssessments.link, disabled: true }],
      phase: ['', Validators.required],
      module: ['', Validators.required],
      evaluationCriteria: ['', Validators.required],
    });

    this.assessmentForm.patchValue({
      title: this.pendingAssessments.assessmentName,
      testDate: this.pendingAssessments.testDate,
      testTime: this.pendingAssessments.testTime,
      link: this.pendingAssessments.link,
    });
  }

  handleAssessmentId(assessmentId: number): void {
    this.selectedAssessmentId = assessmentId; 
    console.log('Received Assessment ID:', this.selectedAssessmentId);
    // Additional logic to handle the assessmentId
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
        title: this.assessmentForm.get('assessmentName')?.value,
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

  onBatchChange(selectedValue: string) {
    this.assessmentForm.get('batch')?.setValue(selectedValue);
    console.log(selectedValue);
      this.onlineAssessmentListingService.getAllOnlineAssessments(selectedValue).subscribe(
        (data) => {
          console.log('assignments', data);
          this.pendingAssessments=data;
        },
        (error) => console.error('Error loading assignments:', error)
      );
  }
  onPhaseChange(event: any) {
    this.assessmentForm.get('phase')?.setValue(event);
  }
  onEvaluationCriteriaChange(event: any) {
    this.assessmentForm.get('evaluationCriteria')?.setValue(event);
  }
}
