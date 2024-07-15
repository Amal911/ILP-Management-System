import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormControl, FormsModule, FormArray } from '@angular/forms';
import * as XLSX from 'xlsx';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-create-batch',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, StepperModule, CommonModule,FormsModule],
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
  cols: any;
  products: any;

 
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createBatchForm = this.fb.group({
      selectYear: ['', Validators.required],
      numberOfTotalDays: ['', Validators.required],
      batchCode: ['', Validators.required],
      startDate: ['', Validators.required],
      batchName: ['', Validators.required],
      endDate: ['', Validators.required],
      batchType: ['', Validators.required],
      trainerLeaveApproverDropdown: ['', Validators.required],
      learningLeaveApproverDropdown: ['', Validators.required],
      locationDropdown: ['', Validators.required],
      phaseName: ['', Validators.required],
      phaseStartDate: ['', Validators.required],
      numberOfDays: ['', Validators.required],
      evaluationCriteriaOne: ['', Validators.required],
      weightageOne: ['', Validators.required],
      // evaluationCriteriaTwo: ['', Validators.required],
      // weightageTwo: ['', Validators.required],
      // evaluationCriteriaThree: ['', Validators.required],
      // weightageThree: ['', Validators.required],
      // evaluationCriteriaFour: ['', Validators.required],
      //weightageFour: ['', Validators.required],
      assessmentTypeList: this.fb.array([this.getAssessmentTypeFields()])
    });
    
  }
  
  getAssessmentTypeFields(): FormGroup {
    return this.fb.group({
      assessmentType: ['', Validators.required],
      weightage: ['', Validators.required]
    });
  }

  assessmentTypeListArray(){
    return this.createBatchForm.get('assessmentTypeList') as FormArray;
  }
  addAssessmentType(){
    this.assessmentTypeListArray().push(this.getAssessmentTypeFields());
  }
  removeAssessmentType(index:number){
    this.assessmentTypeListArray().removeAt(index);
  }
  getFormControl(controlName: string): FormControl {
    return this.createBatchForm.get(controlName) as FormControl;
  }
  

  createBatch(): void {
    console.log(this.createBatchForm.value);
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
}
