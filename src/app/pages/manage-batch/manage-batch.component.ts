import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';


@Component({
  selector: 'app-manage-batch',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,TableModule,ButtonModule,ConfirmDialogModule,ToastModule,TooltipModule],
  providers:[ConfirmationService,MessageService],
  templateUrl: './manage-batch.component.html',
  styleUrl: './manage-batch.component.scss'
})
export class ManageBatchComponent {

  batchForm!:FormGroup;
  isEditable = false;

  trainees = [
    { name: 'Amal E A' },
    { name: 'Devipriya M S' },
    { name: 'Dharsan C Sajeev' },
    { name: 'Jisna George' },
    { name: 'Kailas Nadh J' },
    { name: 'Reshmi M' },
    { name: 'Thulasi K' },
  ];
  constructor(private fb: FormBuilder,private confirmationService: ConfirmationService, private messageService: MessageService) { }

  // ngOnInit(): void {
  //   this.batchForm = this.fb.group({
  //     program: new FormControl({ value: 'ILP 2023-24', disabled: true }, [Validators.required]),
  //     status: new FormControl({ value: 'Active', disabled: true }, [Validators.required]),
  //     batchCode: new FormControl({ value: 'BAT2324ILP04', disabled: true }, [Validators.required]),
  //     numberOfDays: new FormControl({ value: '140', disabled: true }, [Validators.required]),
  //     batchName: new FormControl({ value: 'ILP-2023-B03', disabled: true }, [Validators.required]),
  //     startDate: new FormControl({ value: '2024-04-15', disabled: true }, [Validators.required]),
  //     numberOfTrainees: new FormControl({ value: '38', disabled: true }, [Validators.required]),
  //     endDate: new FormControl({ value: '2024-08-31', disabled: true }, [Validators.required]),
  //     location: new FormControl({ value: 'Trivandrum', disabled: true }, [Validators.required]),
  //     batchType: new FormControl({ value: 'Developers', disabled: true }, [Validators.required]),
  //     phases: this.fb.array([
  //       this.fb.group({
  //         phaseName: ['Tech Fundamentals'],
  //         numberOfDays: ['10'],
  //         phaseStartDate: ['2024-07-01'],
  //         phaseEndDate: ['2024-07-10'],
  //         assessmentTypeList: this.fb.array([
  //           this.fb.group({
  //             evaluationCriteria: ['Daily Assessment'],
  //             weightage: ['50']
  //           }),
  //           this.fb.group({
  //             evaluationCriteria: ['Live Assessment'],
  //             weightage: ['50']
  //           })
  //         ])
  //       }),
  //       this.fb.group({
  //         phaseName: ['Business Orientation'],
  //         numberOfDays: ['15'],
  //         phaseStartDate: ['2024-07-11'],
  //         phaseEndDate: ['2024-07-25'],
  //         assessmentTypeList: this.fb.array([
  //           this.fb.group({
  //             evaluationCriteria: ['Project'],
  //             weightage: ['70']
  //           }),
  //           this.fb.group({
  //             evaluationCriteria: ['Module'],
  //             weightage: ['30']
  //           })
  //         ])
  //       }),
  //     ])
  //   });
  // }
  ngOnInit(): void {
    this.batchForm = this.fb.group({
      program: new FormControl({ value: 'ILP 2023-24', disabled: true }, [Validators.required]),
      status: ['Active'],
      batchCode: new FormControl({ value: 'BAT2324ILP04', disabled: true }, [Validators.required]),
      numberOfDays: new FormControl({ value: '140', disabled: true }, [Validators.required]),
      batchName: new FormControl({ value: 'ILP-2023-B03', disabled: true }, [Validators.required]),
      startDate: new FormControl({ value: '2024-04-15', disabled: true }, [Validators.required]),
      numberOfTrainees: new FormControl({ value: '38', disabled: true }, [Validators.required]),
      endDate: new FormControl({ value: '2024-08-31', disabled: true }, [Validators.required]),
      location: new FormControl({ value: 'Trivandrum', disabled: true }, [Validators.required]),
      batchType: new FormControl({ value: 'Developers', disabled: true }, [Validators.required]),
      phases: this.fb.array([
        this.fb.group({
          phaseName: new FormControl({ value: 'Tech Fundamentals', disabled: true }),
          numberOfDays: new FormControl({ value: '10', disabled: true }),
          phaseStartDate: new FormControl({ value: '2024-07-01', disabled: true }),
          phaseEndDate: new FormControl({ value: '2024-07-10', disabled: true }),
          assessmentTypeList: this.fb.array([
            this.fb.group({
              evaluationCriteria: new FormControl({ value: 'Daily Assessment', disabled: true }),
              weightage: new FormControl({ value: '50', disabled: true })
            }),
            this.fb.group({
              evaluationCriteria: new FormControl({ value: 'Live Assessment', disabled: true }),
              weightage: new FormControl({ value: '50', disabled: true })
            })
          ])
        }),
        this.fb.group({
          phaseName: new FormControl({ value: 'Business Orientation', disabled: true }),
          numberOfDays: new FormControl({ value: '15', disabled: true }),
          phaseStartDate: new FormControl({ value: '2024-07-11', disabled: true }),
          phaseEndDate: new FormControl({ value: '2024-07-25', disabled: true }),
          assessmentTypeList: this.fb.array([
            this.fb.group({
              evaluationCriteria: new FormControl({ value: 'Project', disabled: true }),
              weightage: new FormControl({ value: '70', disabled: true })
            }),
            this.fb.group({
              evaluationCriteria: new FormControl({ value: 'Module', disabled: true }),
              weightage: new FormControl({ value: '30', disabled: true })
            })
          ])
        }),
      ])
    });

    this.batchForm.disable();
  }
  getStatusClass() {
    const status = this.batchForm.get('status')?.value;
    return status === 'Active' ? 'bg-success' : 'bg-danger';
  }

  createPhase(): FormGroup {
    return this.fb.group({
      phaseName: new FormControl('', Validators.required),
      phaseStartDate: new FormControl('', Validators.required),
      phaseEndDate: new FormControl('', Validators.required,),
      numberOfDays: new FormControl('', Validators.required),
      assessmentTypeList: this.fb.array([this.createAssessmentType()])
    });
  }

  createAssessmentType(): FormGroup {
    return this.fb.group({
      evaluationCriteria: new FormControl('', Validators.required),
      weightage: new FormControl('', Validators.required)
    });
  }

  phasesArray(): FormArray {
    return this.batchForm.get('phases') as FormArray;
  }

  assessmentTypeListArray(phaseIndex: number): FormArray {
    return this.phasesArray().at(phaseIndex).get('assessmentTypeList') as FormArray;
  }

  // addPhase(): void {
  //   if (this.isEditable) {
  //     this.phasesArray().push(this.createPhase());
  //   }
  // }
  addPhase(): void {
    if (this.isEditable) {
      const newPhase = this.createPhase();
      newPhase.enable();
      this.phasesArray().push(newPhase);
    }
  }



  removePhase(index: number): void {
    if (this.isEditable) {
      this.phasesArray().removeAt(index);
    }
  }

  // addAssessmentType(phaseIndex: number): void {
  //   if (this.isEditable) {
  //     this.assessmentTypeListArray(phaseIndex).push(this.createAssessmentType());
  //   }
  // }
  addAssessmentType(phaseIndex: number): void {
    if (this.isEditable) {
      const newAssessment = this.createAssessmentType();
      newAssessment.enable();
      this.assessmentTypeListArray(phaseIndex).push(newAssessment);
    }
  }
  removeAssessmentType(phaseIndex: number, assessmentIndex: number): void {
    if (this.isEditable) {
      this.assessmentTypeListArray(phaseIndex).removeAt(assessmentIndex);
    }
  }

  getFormControl(controlName: string): FormControl {
    return this.batchForm.get(controlName) as FormControl;
  }
ngAfterViewInit(): void {
    this.disableDragAndDrop();
  }

  disableDragAndDrop(): void {
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
      input.addEventListener('dragstart', event => event.preventDefault());
      input.addEventListener('drop', event => event.preventDefault());
    });
  }
  editBatch() {
    this.isEditable = true;
    this.batchForm.enable();

    this.phasesArray().controls.forEach(phase => {
      phase.enable();
      const assessmentTypeList = phase.get('assessmentTypeList') as FormArray;
      assessmentTypeList.controls.forEach(assessment => assessment.enable());
    });
  }

  downloadBatch() {
  }
  onCancel() {

    }
  saveBatchDetails() {
    this.isEditable = false;
    this.batchForm.disable();
    console.log(this.batchForm.value);
  }
   futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return selectedDate >= today ? null : { pastDate: true };
    };
  }
  editTrainee(index: number) {
    console.log('Edit trainee:', this.trainees[index]);
  }

  removeTrainee(index: number) {
    this.trainees.splice(index, 1);

  }

  moveTrainee(index: number) {
    console.log('Move trainee:', this.trainees[index]);
  }

  tooltipOptions = {
    showDelay: 150,
    autoHide: false,
    tooltipEvent: 'hover',
    tooltipPosition: 'bottom'
};
confirm(index: number) {
  this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
        this.removeTrainee(index)
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Removed trainee from batch', life: 3000 });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Aborted removing trainee from batch', life: 3000 });
      }
  });
}


}
