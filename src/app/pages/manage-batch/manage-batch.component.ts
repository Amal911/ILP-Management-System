import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ApiService } from '../../services/api.service';
import { ManageBatchService } from '../../services/API/manage-batch.service';
import { UpdateBatchRequestDTO } from '../../../models/BatchDetails.interface';

@Component({
  selector: 'app-manage-batch',

  standalone: true,

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,
  ],

  providers: [ConfirmationService, MessageService],

  templateUrl: './manage-batch.component.html',

  styleUrl: './manage-batch.component.scss',
})
export class ManageBatchComponent {
  // [x: string]: any;

  batchForm!: FormGroup;

  isEditable = false;

  batchtype: any;

  batchLocation: any;

  phasesData: any;

  assessmentType: any;

  batchDetails: any;
  batchProgram: any;

  trainees = [];
  phases: any;

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private api: ApiService,
    private manageBatchService: ManageBatchService
  ) {}

  ngOnInit(): void {
    this.api.getBatchType().subscribe((res) => {
      this.batchtype = res;
    });

    this.api.getBatchLocation().subscribe((res) => {
      this.batchLocation = res;
    });

    this.api.getPhases().subscribe((res) => {
      this.phasesData = res;
    });

    this.api.getAssessmentTypes().subscribe((res) => {
      this.assessmentType = res;
    });
    this.manageBatchService.getBatchProgram().subscribe((res) => {
      this.batchProgram = res;
    });
    this.manageBatchService.getBatchDetailByID(1).subscribe((res) => {
      console.log('Batch details from API:', res);
      this.batchDetails = res;
      this.populateForm(this.batchDetails);
    });

    this.batchForm = this.fb.group({
      programId: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      status: [''],
      batchCode: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      batchDuration: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      batchName: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      startDate: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      numberOfTrainees: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      endDate: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      locationId: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      batchTypeId: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),

      phases: this.fb.array([
        this.fb.group({
          phaseName: new FormControl({ value: '', disabled: true }),
          numberOfDays: new FormControl({ value: '', disabled: true }),
          phaseStartDate: new FormControl({ value: '', disabled: true }),
          phaseEndDate: new FormControl({ value: '', disabled: true }),
          assessmentTypeList: this.fb.array([
            this.fb.group({
              evaluationCriteria: new FormControl({ value: '', disabled: true}),
              weightage: new FormControl({ value: '', disabled: true })
            }),
            this.fb.group({
              evaluationCriteria: new FormControl({ value: '', disabled: true }),
              weightage: new FormControl({ value: '', disabled: true })
            })
          ])
        })
      ]),
    });
    this.batchForm.disable();
    this.batchForm.get('startDate')?.valueChanges.subscribe(() => {
      this.updatePhaseStartDate();
    });
  
    this.batchForm.get('batchDuration')?.valueChanges.subscribe(() => {
      this.updateEndDate();
    });
  
    this.subscribeToPhaseChanges();
    
  }
  populateForm(batchDetails: any): void {
    const phasesArray = this.fb.array([]);
    const isActive = this.batchDetails[0].isActive; 

    const startDate = new Date(this.batchDetails[0].startDate);
    const formattedStartDate = this.formatDate(startDate);

    const endDate = new Date(this.batchDetails[0].endDate);
    const formattedEndDate = this.formatDate(endDate);

    this.batchForm.patchValue({
      programId: this.batchDetails[0].programId,
      status: isActive ? 'Active' : 'Completed',
      batchCode: this.batchDetails[0].batchCode,
      batchDuration: this.batchDetails[0].batchDuration,
      batchName: this.batchDetails[0].batchName,
      startDate: formattedStartDate,
      numberOfTrainees: this.batchDetails[0].traineeCount,
      endDate: formattedEndDate,
      locationId: this.batchDetails[0].locationId,
      batchTypeId: this.batchDetails[0].batchTypeId,
      //phases: this.fb.array([]),
    });

   // this.batchForm.setControl('phases', phasesArray);
    this.trainees = this.batchDetails[0].traineeList;
    this.phasesData = this.batchDetails[0].batchPhases;

    
this.setPhases(this.batchDetails[0].batchPhases);
this.setAssessmentTypes(this.batchDetails[0].batchPhases.phaseAssessmentTypeMappings,0)
    this.batchForm.disable();
    this.batchForm.get('startDate')?.valueChanges.subscribe(changes => {
      this.updateEndDate();
    });
    this.batchForm.get('batchDuration')?.valueChanges.subscribe(changes => {
      this.updateEndDate();
    });
    this.subscribeToPhaseChanges()

  }
  //Batch End date based on start date and duration number of days
  updateEndDate(){
    const startDateValue = this.batchForm.get('startDate')?.value;
    const batchDurationDays = this.batchForm.get('batchDuration')?.value;
    if (startDateValue && batchDurationDays) {
      const startDate = new Date(startDateValue);
      const durationDays = parseInt(batchDurationDays, 10);

      if (!isNaN(durationDays)) {
        const endDate = this.calcWorkingDays(startDate, durationDays);
        this.batchForm
          .get('endDate')
          ?.setValue(endDate.toISOString().split('T')[0]);
      } else {
        console.error('Invalid batch duration');
      }
    }
    
  }
  //Checking the changes in Phases
  subscribeToPhaseChanges() {
    const phases = this.phasesArray();

    phases.controls.forEach((control: AbstractControl, index: number) => {
      const phases = control as FormGroup;
      phases
        .get('numberOfDays')
        ?.valueChanges.subscribe(() => this.updatePhaseEndDate(index));        
    });
  }
  //Phase Start Date Calculation
private updatePhaseStartDate(): void {
  const batchStartDate = this.batchForm.get('startDate')?.value;
  if (batchStartDate) {
    const startDate = new Date(batchStartDate);

    const phases = this.phasesArray();
    if (phases.length > 0) {
      const firstPhase = phases.at(0) as FormGroup;
      firstPhase.get('phaseStartDate')?.setValue(this.formatDate(startDate));
    }
  }
}
  //Phase End Date Calculation
private updatePhaseEndDate(index: number): void {
  if (index < 0 || index >= this.phasesArray().length) {
    // console.error('Index out of bounds');
    return;
  }

  const phases = this.phasesArray();
  const currentPhase = phases.at(index) as FormGroup;
  const numberOfDays = currentPhase.get('numberOfDays')?.value;

  let startDate: Date;

  if (index > 0) {
    const previousPhase = phases.at(index - 1) as FormGroup;
    const previousEndDateValue = previousPhase.get('phaseEndDate')?.value;
    if (previousEndDateValue) {
      startDate = new Date(previousEndDateValue);
      startDate.setDate(startDate.getDate() + 1);
    } else {
      // console.error('Previous phase end date not found');
      return;
    }
  } else {
    const batchStartDate = this.batchForm.get('startDate')?.value;
    if (batchStartDate) {
      startDate = new Date(batchStartDate);
    } else {
      // console.error('Batch start date not found');
      return;
    }
  }

  if (startDate.getDay() === 0) {
    startDate.setDate(startDate.getDate() + 1);
  }

  currentPhase.get('phaseStartDate')?.setValue(this.formatDate(startDate));

  if (numberOfDays) {
    const durationDays = parseInt(numberOfDays, 10);
    if (!isNaN(durationDays)) {
      const endDate = this.calcWorkingDays(startDate, durationDays);
      currentPhase.get('phaseEndDate')?.setValue(this.formatDate(endDate));
    } else {
      console.error('Invalid number of days');
    }
  }

  this.updateSubsequentPhases(index);
}
  // Update subsequent phases

private updateSubsequentPhases(fromIndex: number): void {
  const phases = this.phasesArray();
  for (let i = fromIndex + 1; i < phases.length; i++) {
    this.updatePhaseEndDate(i);
  }
}
  getPreviousPhaseStartDate() {
    let phaseCount = this.batchForm.get('phases')?.value.length;
    if (phaseCount >= 1) {
      let endDate =
        this.batchForm.get('phases')?.value[phaseCount - 1].endDate;
      console.log(endDate);
      return endDate;
    }
  }
  //Calculating Working days
  calcWorkingDays(fromDate: Date, days: number): Date {
    let count = 0;

    while (count < days) {
      if (fromDate.getDay() !== 0) {
        count++;
      }
      if (count < days) {
        fromDate.setDate(fromDate.getDate() + 1);
      }
    }
    return fromDate;
  }
  //Populating the phase details from API response
setPhases(phases: any[]): void {
  const phasesArray = this.batchForm.get('phases') as FormArray;
  phasesArray.clear(); 

  phases.forEach((phase, index) => {
    if (phase && phase.startDate && phase.endDate) {
      const formattedStartDate = this.formatDate(new Date(phase.startDate));
      const formattedEndDate = this.formatDate(new Date(phase.endDate));

      const phaseGroup = this.fb.group({
        phaseName: new FormControl(phase.phase.id, Validators.required),
        phaseStartDate: new FormControl(formattedStartDate, Validators.required),
        phaseEndDate: new FormControl(formattedEndDate, Validators.required),
        numberOfDays: new FormControl(phase.numberOfDays || '', Validators.required),
        assessmentTypeList: this.fb.array([]),
      });
      this.phases=phase

      phasesArray.push(phaseGroup);
      this.setAssessmentTypes(phase.phaseAssessmentTypeMappings, index);
    } else {
      console.error('Invalid phase object:', phase);
    }
  });
}

//Populating assessment types from API response
setAssessmentTypes(assessments: any[] = [], phaseIndex: number): void {
  console.log('Setting assessment types:', assessments, 'for phase index:', phaseIndex);
  const phaseFormArray = (this.batchForm.get('phases') as FormArray)
      .at(phaseIndex)
      .get('assessmentTypeList') as FormArray;
  assessments.forEach((assessment) => {
    this.assessmentType=assessments
    console.log(assessment);
      if (assessment && assessment.assessmentType && typeof assessment.weightage === 'number') {
          phaseFormArray.push(
              this.fb.group({
                  evaluationCriteria: new FormControl(
                      assessment.assessmentType.id,
                      Validators.required
                  ),
                  weightage: new FormControl(
                      assessment.weightage || '',
                      Validators.required
                  ),
              })
              
          );


      } else {
          console.error('Invalid assessment object:', assessment);
      }
  });
}


  getStatusClass() {
    const status = this.batchForm.get('status')?.value;

    return status === 'Active' ? 'bg-success' : 'bg-danger';
  }
  formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); 
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

  createPhase(): FormGroup {
    return this.fb.group({
      phaseName: new FormControl('', Validators.required),

      phaseStartDate: new FormControl('', Validators.required),

      phaseEndDate: new FormControl('', Validators.required),

      numberOfDays: new FormControl('', Validators.required),

      assessmentTypeList: this.fb.array([this.createAssessmentType()]),
    });
  }

  createAssessmentType(): FormGroup {
    return this.fb.group({
      evaluationCriteria: new FormControl('', Validators.required),

      weightage: new FormControl('', Validators.required),
    });
  }

  phasesArray(): FormArray {
    return this.batchForm.get('phases') as FormArray;
  }

  assessmentTypeListArray(phaseIndex: number): FormArray {
    return this.phasesArray()
      .at(phaseIndex)
      .get('assessmentTypeList') as FormArray;
  }

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

    inputs.forEach((input) => {
      input.addEventListener('dragstart', (event) => event.preventDefault());

      input.addEventListener('drop', (event) => event.preventDefault());
    });
  }

  editBatch() {
    this.isEditable = true;
    this.batchForm.enable();
    
    this.phasesArray().controls.forEach((phase) => {
      phase.enable();

      const assessmentTypeList = phase.get('assessmentTypeList') as FormArray;

      assessmentTypeList.controls.forEach((assessment) => assessment.enable());
    });
    
  }

  downloadBatch() {}

  onCancel() {}
  convertToDate(dateString: string): Date {
    return new Date(dateString);
  }
  
  // saveBatchDetails() {
  //   this.isEditable = false;
  //   // this.batchForm.disable();
  // console.log('Program ID:', this.batchForm.get('programId')?.value);
  // console.log('Status:', this.batchForm.get('status')?.value);
  // console.log('Batch Code:', this.batchForm.get('batchCode')?.value);
  // console.log('Phases:', this.batchForm.get('phases')?.value);
  // console.log(this.batchForm.value);
  // console.log('Entire Form Values:', this.batchForm.value);
  // console.log('Program ID:', this.batchForm.get('programId')?.value);
  // console.log('Status:', this.batchForm.get('status')?.value);
  // console.log('Batch Code:', this.batchForm.get('batchCode')?.value);
  // console.log('Batch Duration:', this.batchForm.get('batchDuration')?.value);
  // console.log('Batch Name:', this.batchForm.get('batchName')?.value);
  // console.log('Start Date:', this.batchForm.get('startDate')?.value);
  // console.log('Number of Trainees:', this.batchForm.get('numberOfTrainees')?.value);
  // console.log('End Date:', this.batchForm.get('endDate')?.value);
  // console.log('Location ID:', this.batchForm.get('locationId')?.value);
  // console.log('Batch Type ID:', this.batchForm.get('batchTypeId')?.value);
  // console.log('Phases:', this.batchForm.get('phases')?.value);
  // const phasesArray = this.batchForm.get('phases') as FormArray;

  // // Log each phaseGroup
  // phasesArray.controls.forEach((phaseGroup, index) => {
  //   console.log(`Phase Group ${index}:`, phaseGroup.value);
  // });
  
  //    this.batchForm.disable();

  // }
  
  // saveBatchDetails() {
  //   if (this.batchForm.invalid) {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Form Error',
  //       detail: 'Please correct the errors in the form.',
  //       life: 3000,
  //     });
  //     return;
  //   }
  
  //   this.isEditable = false;
  
  //   const batchDetails: UpdateBatchRequestDTO = {
  //     id: this.batchForm.get('programId')?.value as number,
  //     batchName: this.batchForm.get('batchName')?.value,
  //     batchCode: this.batchForm.get('batchCode')?.value,
  //     batchDuration: this.batchForm.get('batchDuration')?.value,
  //     startDate: this.batchForm.get('startDate')?.value,
  //     endDate: this.batchForm.get('endDate')?.value,
  //     isActive: this.batchForm.get('status')?.value === 'Active',
  //     programId: this.batchForm.get('programId')?.value as number,
  //     locationId: this.batchForm.get('locationId')?.value as number,
  //     batchTypeId: this.batchForm.get('batchTypeId')?.value as number,
  //     batchPhases: (this.batchForm.get('phases')?.value || []).map((phase: any) => ({
  //       BatchId: this.batchForm.get('programId')?.value as number,
  //       PhaseId: phase.phaseName as number,
  //       NumberOfDays: phase.numberOfDays,
  //       StartDate: phase.phaseStartDate,
  //       EndDate: phase.phaseEndDate,
  //       PhaseAssessmentTypeMappings: (phase.assessmentTypeList || []).map((assessment: any) => ({
  //         AssessmentTypeId: assessment.evaluationCriteria as number,
  //         Weightage: assessment.weightage
  //       }))
  //     }))
  //   };
  // console.log(batchDetails);
  
  //   this.manageBatchService.updateBatch(batchDetails.id, batchDetails).subscribe(
  //     () => {
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Success',
  //         detail: 'Batch details updated successfully!',
  //         life: 3000,
  //       });
  //     },
  //     error => {
  //       console.error('Error updating batch:', error);
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Update Failed',
  //         detail: 'There was an error updating the batch details.',
  //         life: 3000,
  //       });
  //     }
  //   );
  // }
  saveBatchDetails() {
    if (this.batchForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Form Error',
        detail: 'Please correct the errors in the form.',
        life: 3000,
      });
      return;
    }
  
    this.isEditable = false;
  
    const batchDetails: UpdateBatchRequestDTO = {
      // id: this.batchForm.get('programId')?.value as number,
      id: this.batchDetails[0].id as number,
      batchName: this.batchForm.get('batchName')?.value,
      batchCode: this.batchForm.get('batchCode')?.value,
      batchDuration: this.batchForm.get('batchDuration')?.value,
      startDate: this.convertToDate(this.batchForm.get('startDate')?.value).toISOString(),
      endDate: this.convertToDate(this.batchForm.get('endDate')?.value).toISOString(),
      isActive: this.batchForm.get('status')?.value === 'Active',
      programId: this.batchForm.get('programId')?.value as number,
      locationId: this.batchForm.get('locationId')?.value as number,
      batchTypeId: this.batchForm.get('batchTypeId')?.value as number,
      batchPhases: (this.batchForm.get('phases')?.value || []).map((phase: any) => ({
        BatchId: this.batchForm.get('programId')?.value as number,
        PhaseId: phase.phaseName as number,
        NumberOfDays: phase.numberOfDays,
        StartDate: this.convertToDate(phase.phaseStartDate).toISOString(),
        EndDate: this.convertToDate(phase.phaseEndDate).toISOString(),
        PhaseAssessmentTypeMappings: (phase.assessmentTypeList || []).map((assessment: any) => ({
          AssessmentTypeId: assessment.evaluationCriteria as number,
          Weightage: assessment.weightage
        }))
      }))
    };
  
    console.log(batchDetails);
  
    this.manageBatchService.updateBatch(batchDetails.id, batchDetails).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Batch details updated successfully!',
          life: 3000,
        });
      },
      error => {
        console.error('Error updating batch:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Update Failed',
          detail: 'There was an error updating the batch details.',
          life: 3000,
        });
      }
    );
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

    tooltipPosition: 'bottom',
  };

  confirm(index: number) {
    this.confirmationService.confirm({
      header: 'Are you sure?',

      message: 'Please confirm to proceed.',

      accept: () => {
        this.removeTrainee(index);

        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Removed trainee from batch',
          life: 3000,
        });
      },

      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Aborted removing trainee from batch',
          life: 3000,
        });
      },
    });
  }
  
}
