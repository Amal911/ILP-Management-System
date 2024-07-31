import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormControl,
  FormsModule,
  FormArray,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import * as XLSX from 'xlsx';
import { NgModule } from '@angular/core';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { ApiService } from '../../services/api.service';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-batch',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    StepperModule,
    CommonModule,
    FormsModule,
    DropdownComponent,
    TableModule,
  ],
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: [
    `
      .p-stepper {
        flex-basis: 50rem;
      }
    `,
  ],
})
export class CreateBatchComponent {
  createBatchForm!: FormGroup;
  batchStartDateVar!: string;
  batchDurationDays!: number;
  batchtype: any;
  batchLocation: any;
  phasesData: any;
  programData: any;
  assessmentType: any;
  allPhases: any[] = [];
  phaseIds: number[] = [];


  //Validations
  pastDateValidator(): ValidatorFn {
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

  weightageSumValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control instanceof FormArray) {
        const weightageControls = control.controls;
        const totalWeightage = weightageControls.reduce((sum, control) => {
          const weightage = control.get('weightage')?.value;
          return sum + (weightage ? parseFloat(weightage) : 0);
        }, 0);

        return totalWeightage == 100 ? null : { invalidWeightageSum: true };
      }
      return null;
    };
  }

  daysValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value > 0 ? null : { invalidDays: true };
    };
  }
  constructor(private fb: FormBuilder, private api: ApiService,private route:Router) {}

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
      this.allPhases = [...this.phasesData];
      console.log(this.phasesData);
    });
    this.api.getAssessmentTypes().subscribe((res) => {
      this.assessmentType = res;
      console.log(this.assessmentType);
    });


    this.createBatchForm = this.fb.group({
      batchDetails: this.fb.group({
        programId: ['', Validators.required],
        batchDuration: ['', [Validators.required, this.daysValidator()]],
        batchCode: ['', Validators.required],
        startDate: ['', [Validators.required, this.pastDateValidator()]],
        batchName: ['', Validators.required],
        endDate: ['', [Validators.required, this.pastDateValidator()]],
        batchTypeId: ['', Validators.required],
        locationId: ['', Validators.required],
      }),
      phaseDetails: this.fb.array([this.createPhase()])
    });

    this.createBatchForm
      .get('batchDetails.startDate')
      ?.valueChanges.subscribe(() => this.updateEndDate());
    this.createBatchForm
      .get('batchDetails.batchDuration')
      ?.valueChanges.subscribe(() => this.updateEndDate());

    this.subscribeToPhaseChanges();
  }




  //Batchduration Date Calculation
  updateEndDate() {
    const startDateValue = this.createBatchForm.get(
      'batchDetails.startDate'
    )?.value;
    const batchDurationDays = this.createBatchForm.get(
      'batchDetails.batchDuration'
    )?.value;

    if (startDateValue && batchDurationDays) {
      const startDate = new Date(startDateValue);
      const durationDays = parseInt(batchDurationDays, 10);

      if (!isNaN(durationDays)) {
        const endDate = this.calcWorkingDays(startDate, durationDays);
        this.createBatchForm
          .get('batchDetails.endDate')
          ?.setValue(endDate.toISOString().split('T')[0]);
        console.log('Batch End Date:', endDate.toDateString());
      } else {
        console.error('Invalid batch duration');
      }
    }
  }

  //Phase Creation
  createPhase(): FormGroup {
    return this.fb.group({
      phaseId: ['', Validators.required],
      startDate: ['', [Validators.required, this.pastDateValidator()]],
      endDate: ['', [Validators.required, this.pastDateValidator()]],
      numberOfDays: ['', [Validators.required, this.daysValidator()]],
      phaseAssessmentMapping: this.fb.array(
        [this.createAssessmentType()],
        this.weightageSumValidator()
      ),
    });
  }

  phasesArray(): FormArray {
    return this.createBatchForm.get('phaseDetails') as FormArray;
  }

  addPhase(): void {
    const phaseFormGroup = this.fb.group({
      phaseId:[''],
      startDate: [''],
      numberOfDays: ['', Validators.required],
      endDate: [''],
    });

    phaseFormGroup.get('numberOfDays')?.statusChanges.subscribe(() => {
      const index = this.phasesArray().length - 1;
      this.updatePhaseEndDate(index);
    });
    let startDate = new Date(this.getPreviousPhaseStartDate());
    console.log('asdsa');
    let startDateString = startDate.toISOString().split('T')[0];
    console.log(startDateString);

    phaseFormGroup.get('startDate')?.setValue(startDateString);
    console.log(phaseFormGroup.value);

    this.phasesArray().push(this.createPhase());
    this.assessmentTypesList.push([]);
    console.log(this.assessmentTypesList);
    this.subscribeToPhaseChanges();
  }

  removePhase(index: number): void {
    let phaseId = Number(this.phasesArray().value[index].phaseId);
    this.phaseList= this.phaseList.filter((id:number)=>id!=phaseId)
    console.log(this.phasesArray().value[index].phaseId);
    
    this.phasesArray().removeAt(index);
    this.updatePhaseEndDate(index);
  }

  subscribeToPhaseChanges() {
    const phases = this.phasesArray();

    phases.controls.forEach((control: AbstractControl, index: number) => {
      const phase = control as FormGroup;
      phase
        .get('numberOfDays')
        ?.valueChanges.subscribe(() => this.updatePhaseEndDate(index));
    });
  }

  //Phase Duration Calculation Function
  updatePhaseEndDate(index: number) {
    console.log('update');

    if (index < 0 || index >= this.phasesArray().length) {
      console.error('error index out of bounds');
      return;
    }

    for (let i = index; i < this.phasesArray().length; i++) {
      console.log(i);
      const phase = this.phasesArray().at(i) as FormGroup;
      const startDateValue = this.createBatchForm.get(
        'batchDetails.startDate'
      )?.value;
      const numberOfDays = phase.get('numberOfDays')?.value;

      let startDate: Date;

      if (i === 0 && startDateValue) {
        startDate = new Date(startDateValue);
        phase.get('startDate')?.setValue(startDate.toISOString().split('T')[0]);
      } else if (i > 0) {
        const previousPhase = this.phasesArray().at(i - 1) as FormGroup;
        const previousEndDateValue = previousPhase.get('endDate')?.value;
        if (previousEndDateValue) {
          startDate = new Date(previousEndDateValue);
          startDate.setDate(startDate.getDate() + 1);
          phase
            .get('startDate')
            ?.setValue(startDate.toISOString().split('T')[0]);
        } else {
          console.error('No valid start date');
          return;
        }
      } else {
        console.error('No valid start date');
        return;
      }

      if (numberOfDays) {
        const durationDays = parseInt(numberOfDays, 10);

        if (!isNaN(durationDays)) {
          const endDate = this.calcWorkingDays(startDate, durationDays);
          //phase.get('startDate')?.setValue(startDate.toISOString().split('T')[0]);
          phase.get('endDate')?.setValue(endDate.toISOString().split('T')[0]);
          console.log(`Phase ${i + 1} End Date:`, endDate.toDateString());
        } else {
          console.error('Invalid number of days');
        }
      }
    }
  }

  //Previous Phase Enddate Retrieving Function
  getPreviousPhaseStartDate() {
    let phaseCount = this.createBatchForm.get('phaseDetails')?.value.length;
    if (phaseCount >= 1) {
      let endDate =
        this.createBatchForm.get('phaseDetails')?.value[phaseCount - 1].endDate;
      console.log(endDate);
      return endDate;
    }
  }

  //Assessment Type selection

  createAssessmentType(): FormGroup {
    return this.fb.group({
      assessmentTypeId: ['', Validators.required],
      weightage: ['', [Validators.required, this.weightageValidator()]],
    });
  }

  assessmentTypeListArray(phaseIndex: number): FormArray {
    return this.phasesArray()
      .at(phaseIndex)
      .get('phaseAssessmentMapping') as FormArray;
  }

  addAssessmentType(phaseIndex: number): void {
    this.assessmentTypeListArray(phaseIndex).push(this.createAssessmentType());    
  }

  removeAssessmentType(phaseIndex: number, assessmentIndex: number): void {
    let assessmentTypeId = Number(this.assessmentTypeListArray(phaseIndex).value[assessmentIndex].assessmentTypeId)
    console.log(assessmentTypeId);
    
    this.assessmentTypesList[phaseIndex] = this.assessmentTypesList[phaseIndex].filter((id:number)=>id!=assessmentTypeId)
    console.log(this.assessmentTypesList);
    this.assessmentTypeListArray(phaseIndex).removeAt(assessmentIndex);
  }

  //Form Control Validation
  getFormControl(
    controlName: string,
    phaseIndex?: number,
    assessmentIndex?: number
  ): FormControl {
    if (assessmentIndex !== undefined && phaseIndex !== undefined) {
      return this.assessmentTypeListArray(phaseIndex)
        .at(assessmentIndex)
        .get(controlName) as FormControl;
    } else if (phaseIndex !== undefined) {
      return this.phasesArray().at(phaseIndex).get(controlName) as FormControl;
    } else {
      return this.createBatchForm.get(
        `batchDetails.${controlName}`
      ) as FormControl;
    }
  }
  //Creating batch Submit
  createBatch(): void {
    let batchData = this.createBatchForm.value;

    batchData.batchDetails.startDate = new Date(
      batchData.batchDetails.startDate
    ).toISOString();
    batchData.batchDetails.endDate = new Date(
      batchData.batchDetails.endDate
    ).toISOString();

    batchData.phaseDetails.forEach((phase: any, i: number) => {
      batchData.phaseDetails[i].startDate = new Date(
        phase.startDate
      ).toISOString();
      batchData.phaseDetails[i].endDate = new Date(phase.endDate).toISOString();
    });
    batchData.TraineeList = this.traineeDetails;
    console.log(batchData);
    this.api.createNewBatch(batchData).subscribe((res) => {
      console.log(res);
      this.route.navigate(['/team/113/user/ganesh']);
    });
  }

  //Excel Trainee List Upload Function

  columns: string[] = [];
  excelData: any[] = [];
  fileSelected!: boolean;
  traineeDetails = this.excelData;

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
        this.fileSelected = true;

        console.log('Columns:', this.columns);
        console.log('Table Data:', this.excelData);

        const traineeDetails = this.excelData.map((row: any) => ({ ...row }));

        traineeDetails.forEach((trainee: any) => {
          if (trainee.Gender) {
            const gender = trainee.Gender.toString().trim().toLowerCase();
            switch (gender) {
              case 'male':
                trainee.Gender = 1;
                break;
              case 'female':
                trainee.Gender = 2;
                break;
              case 'others':
                trainee.Gender = 3;
                break;
              default:
                trainee.Gender = 'invalid';
                break;
            }
          }
        });
        traineeDetails.forEach((trainee:any)=>{
          console.log(Number(trainee.MobileNumber));
          // if(Number(trainee.MobileNumber)){
            
            trainee.MobileNumber = trainee.MobileNumber.toString();  
          // }
        })

        console.log('Trainee Details:', traineeDetails);
        this.traineeDetails = traineeDetails;
      }
    };

    reader.readAsBinaryString(target.files[0]);
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

  phaseList:any = [];
  addPhase2(event:any){
    console.log(event);
    this.phaseList.push(Number(event));
    console.log(this.phaseList);
  }
  assessmentTypesList:any = [[]];
  addAssessmentType2(event:any,phaseIndex:number){
    console.log(event,phaseIndex);
    this.assessmentTypesList[phaseIndex].push(Number(event));
    console.log(this.assessmentTypesList);
    
  }  
}



