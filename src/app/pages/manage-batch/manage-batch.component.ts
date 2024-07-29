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
  [x: string]: any;

  batchForm!: FormGroup;

  isEditable = false;

  batchtype: any;

  batchLocation: any;

  phasesData: any;

  assessmentType: any;

  batchDetails: any;
  batchProgram: any;

  trainees = [
    // { name: 'Amal E A' },
    // { name: 'Devipriya M S' },
    // { name: 'Dharsan C Sajeev' },
    // { name: 'Jisna George' },
    // { name: 'Kailas Nadh J' },
    // { name: 'Reshmi M' },
    // { name: 'Thulasi K' },
  ];

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

      console.log(this.batchtype);
    });

    this.api.getBatchLocation().subscribe((res) => {
      this.batchLocation = res;

      console.log(this.batchLocation);
    });

    this.api.getPhases().subscribe((res) => {
      this.phasesData = res;

      console.log(this.phasesData);
    });

    this.api.getAssessmentTypes().subscribe((res) => {
      this.assessmentType = res;

      console.log(this.assessmentType);
    });
    this.manageBatchService.getBatchProgram().subscribe((res) => {
      this.batchProgram = res;

      console.log(this.batchProgram);
    });
    this.manageBatchService.getBatchDetailByID(1).subscribe((res) => {
      console.log('Batch details from API:', res);
      this.batchDetails = res;
      console.log('Batch code', this.batchDetails[0].batchCode);
      console.log(
        'Batch phase duration',
        this.batchDetails[0].batchPhases[0].numberOfDays
      );

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
              evaluationCriteria: new FormControl({ value: '', disabled: true }),
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

    this.batchForm.setControl('phases', phasesArray);
    this.trainees = this.batchDetails[0].traineeList;
    this.phasesData = this.batchDetails[0].batchPhases;
    console.log('Type of phases:', typeof this.batchDetails[0].batchPhases);
    console.log(
      'Type of traineeList:',
      typeof this.batchDetails[0].traineeList
    );
this.setPhases(this.batchDetails[0].batchPhases[0]);
    this.batchForm.disable();
  }

  setPhases(phases: any[]): void {
    const phasesArray = this.batchForm.get('phases') as FormArray;
    phases.forEach((phase) => {
      phasesArray.push(
        this.fb.group({
          phaseName: new FormControl(
            phase.phaseName || '',
            Validators.required
          ),
          phaseStartDate: new FormControl(
            phase.startDate || '',
            Validators.required
          ),
          phaseEndDate: new FormControl(
            phase.endDate || '',
            Validators.required
          ),
          numberOfDays: new FormControl(
            phase.numberOfDays || '',
            Validators.required
          ),
          assessmentTypeList: this.fb.array([]),
        })
      );

      this.setAssessmentTypes(phase.assessmentTypeList, phasesArray.length - 1);
    });
  }
  setAssessmentTypes(assessments: any[], phaseIndex: number): void {
    const phaseFormArray = (this.batchForm.get('phases') as FormArray)
      .at(phaseIndex)
      .get('assessmentTypeList') as FormArray;
    assessments.forEach((assessment) => {
      phaseFormArray.push(
        this.fb.group({
          evaluationCriteria: new FormControl(
            assessment.evaluationCriteria || '',
            Validators.required
          ),
          weightage: new FormControl(
            assessment.weightage || '',
            Validators.required
          ),
        })
      );
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
