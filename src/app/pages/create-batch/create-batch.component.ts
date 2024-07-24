import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormControl, FormsModule, FormArray, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as XLSX from 'xlsx';
import { NgModule } from '@angular/core';
import { DropdownComponent } from "../../components/dropdown/dropdown.component";
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-create-batch',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, StepperModule, CommonModule, FormsModule, DropdownComponent],
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: [
    `
    .p-stepper {
        flex-basis: 50rem;
    }`
  ],
})
export class CreateBatchComponent {
  createBatchForm!: FormGroup;
  batchStartDateVar!: string;
  batchDurationDays!: number;
  batchtype: any;
  batchLocation: any;
  phasesData: any;
  assessmentType: any;
  
   futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentDate = new Date();
      const selectedDate = new Date(control.value);
      return selectedDate >= currentDate ? null : { pastDate: true };
    };
  }
  
   weightageValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value > 0 && value <= 100 ? null : { invalidWeightage: true };
    };
  }
  
   daysValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value > 0 ? null : { invalidDays: true };
    };
  }
  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.api.getBatchType().subscribe(res => {
      this.batchtype = res;
      console.log(this.batchtype);
    });
    this.api.getBatchLocation().subscribe(res => {
      this.batchLocation = res;
      console.log(this.batchLocation);
    });
    this.api.getPhases().subscribe(res => {
      this.phasesData = res;
      console.log(this.phasesData);
    });
    this.api.getAssessmentTypes().subscribe(res => {
      this.assessmentType = res;
      console.log(this.assessmentType);
    });

    this.createBatchForm = this.fb.group({
      batchDetails: this.fb.group({
        programId: ['', Validators.required],
        batchDuration: ['',[ Validators.required,this.daysValidator()]],
        batchCode: ['', Validators.required],
        startDate: ['',[ Validators.required,this.futureDateValidator()]],
        batchName: ['', Validators.required],
        endDate: ['', Validators.required],
        batchTypeId: ['', Validators.required],
        locationId: ['', Validators.required],
      }),
      phaseDetails: this.fb.array([this.createPhase()])
    });

    this.createBatchForm.get('batchDetails.startDate')?.valueChanges.subscribe(() => this.updateEndDate());
    this.createBatchForm.get('batchDetails.batchDuration')?.valueChanges.subscribe(() => this.updateEndDate());

    this.subscribeToPhaseChanges();
  }

  createPhase(): FormGroup {
    return this.fb.group({
      phaseId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      numberOfDays: ['', [Validators.required,this.daysValidator()]],
      phaseAssessmentMapping: this.fb.array([this.createAssessmentType()])
    });
  }

  createAssessmentType(): FormGroup {
    return this.fb.group({
      assessmentTypeId: ['', Validators.required],
      weightage: ['', [Validators.required,this.weightageValidator()]]
    });
  }

  phasesArray(): FormArray {
    return this.createBatchForm.get('phaseDetails') as FormArray;
  }

  assessmentTypeListArray(phaseIndex: number): FormArray {
    return this.phasesArray().at(phaseIndex).get('phaseAssessmentMapping') as FormArray;
  }

  addPhase(): void {
    this.phasesArray().push(this.createPhase());
    this.subscribeToPhaseChanges();
  }

  removePhase(index: number): void {
    this.phasesArray().removeAt(index);
  }

  addAssessmentType(phaseIndex: number): void {
    this.assessmentTypeListArray(phaseIndex).push(this.createAssessmentType());
  }

  removeAssessmentType(phaseIndex: number, assessmentIndex: number): void {
    this.assessmentTypeListArray(phaseIndex).removeAt(assessmentIndex);
  }

  getFormControl(controlName: string, phaseIndex?: number, assessmentIndex?: number): FormControl {
    if (assessmentIndex !== undefined && phaseIndex !== undefined) {
      return this.assessmentTypeListArray(phaseIndex).at(assessmentIndex).get(controlName) as FormControl;
    } else if (phaseIndex !== undefined) {
      return this.phasesArray().at(phaseIndex).get(controlName) as FormControl;
    } else {
      return this.createBatchForm.get(`batchDetails.${controlName}`) as FormControl;
    }
  }

  createBatch(): void {
    let batchData = this.createBatchForm.value;
    
    batchData.batchDetails.startDate = new Date(batchData.batchDetails.startDate).toISOString();
    batchData.batchDetails.endDate = new Date(batchData.batchDetails.endDate).toISOString();

    batchData.phaseDetails.forEach((phase: any, i: number) => {
      batchData.phaseDetails[i].startDate = new Date(phase.startDate).toISOString();
      batchData.phaseDetails[i].endDate = new Date(phase.endDate).toISOString();
    });
    console.log(batchData);
    this.api.createNewBatch(batchData).subscribe(res => {
      console.log(res);
    });
  }

  columns: string[] = [];
  excelData: any[] = [];

  onFileChange(event: any): void {
    const target: DataTransfer = event.target as DataTransfer;

    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data: any = XLSX.utils.sheet_to_json(ws, { header: 1 });

      if (data.length > 0) {
        this.columns = data[0] as string[];
        this.excelData = data.slice(1).map((row: any[]) => {
          let rowData: any = {};
          row.forEach((cell: any, index: number) => {
            rowData[this.columns[index]] = cell;
          });
          return rowData;
        });
        console.log("Columns:", this.columns);
        console.log("Table Data:", this.excelData);
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }

  subscribeToPhaseChanges() {
    const phases = this.phasesArray();
    
    phases.controls.forEach((control: AbstractControl, index: number) => {
      const phase = control as FormGroup;
      phase.get('startDate')?.valueChanges.subscribe(() => this.updatePhaseEndDate(index));
      phase.get('numberOfDays')?.valueChanges.subscribe(() => this.updatePhaseEndDate(index));
    });
  }

  

  updateEndDate() {
    const startDateValue = this.createBatchForm.get('batchDetails.startDate')?.value;
    const batchDurationDays = this.createBatchForm.get('batchDetails.batchDuration')?.value;

    if (startDateValue && batchDurationDays) {
      const startDate = new Date(startDateValue);
      const durationDays = parseInt(batchDurationDays, 10);

      if (!isNaN(durationDays)) {
        const endDate = this.calcWorkingDays(startDate, durationDays);
        this.createBatchForm.get('batchDetails.endDate')?.setValue(endDate.toISOString().split('T')[0]);
        console.log('Batch End Date:', endDate.toDateString());
      } else {
        console.error('Invalid batch duration');
      }
    }
  }

  updatePhaseEndDate(index: number) {
    const phase = this.phasesArray().at(index) as FormGroup;
    const startDateValue = phase.get('startDate')?.value;
    const numberOfDays = phase.get('numberOfDays')?.value;

    if (startDateValue && numberOfDays) {
      const startDate = new Date(startDateValue);
      const durationDays = parseInt(numberOfDays, 10);

      if (!isNaN(durationDays)) {
        const endDate = this.calcWorkingDays(startDate, durationDays);
        phase.get('endDate')?.setValue(endDate.toISOString().split('T')[0]);
        console.log(`Phase ${index + 1} End Date:`, endDate.toDateString());
      } else {
        console.error('Invalid number of days for phase');
      }
    }
  }

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
}