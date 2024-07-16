import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormControl, FormsModule, FormArray } from '@angular/forms';
import * as XLSX from 'xlsx';
import { NgModule } from '@angular/core';
import { DropdownComponent } from "../../components/dropdown/dropdown.component";
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
    cols: any;
    products: any;
    // phaseNames = ['Phase 1', 'Phase 2', 'Phase 3'];
    // evaluationCriteriaOptions = ['Criteria 1', 'Criteria 2', 'Criteria 3'];
    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
      this.createBatchForm = this.fb.group({
        selectProgram: ['', Validators.required],
        numberOfTotalDays: ['', Validators.required],
        batchCode: ['', Validators.required],
        startDate: ['', Validators.required],
        batchName: ['', Validators.required],
        endDate: ['', Validators.required],
        batchType: ['', Validators.required],
        trainerLeaveApproverDropdown: ['', Validators.required],
        learningLeaveApproverDropdown: ['', Validators.required],
        locationDropdown: ['', Validators.required],
        phases: this.fb.array([this.createPhase()])
      });
    }
  
    createPhase(): FormGroup {
      return this.fb.group({
        phaseName: ['', Validators.required],
        phaseStartDate: ['', Validators.required],
        phaseEndDate: ['', Validators.required],
        numberOfDays: ['', Validators.required],
        assessmentTypeList: this.fb.array([this.createAssessmentType()])
      });
    }
  
    createAssessmentType(): FormGroup {
      return this.fb.group({
        evaluationCriteria: ['', Validators.required],
        weightage: ['', Validators.required]
      });
    }
  
    phasesArray(): FormArray {
      return this.createBatchForm.get('phases') as FormArray;
    }
  
    assessmentTypeListArray(phaseIndex: number): FormArray {
      return this.phasesArray().at(phaseIndex).get('assessmentTypeList') as FormArray;
    }
  
    addPhase(): void {
      this.phasesArray().push(this.createPhase());
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
  
    // getFormControl(controlName: string): FormControl {
    //   return this.createBatchForm.get(controlName) as FormControl;
    // }
    getFormControl(controlName: string, phaseIndex?: number): FormControl {
      if (phaseIndex !== undefined) {
        return this.phasesArray().at(phaseIndex).get(controlName) as FormControl;
      }
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