
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { DropdownComponent } from "../../components/dropdown/dropdown.component";



interface UploadEvent {
  originalEvent: Event;
  files: File[];
}


@Component({
  selector: 'app-create-assessment',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, FormsModule, TableModule, FileUploadModule, ButtonModule, ProgressBarModule, ToastModule, CommonModule, InputTextareaModule, DropdownComponent],
  templateUrl: './create-assessment.component.html',
  styleUrl: './create-assessment.component.scss',
  providers: [MessageService]
})
export class CreateAssessmentComponent  implements OnInit {
  [x: string]: any;
  assessmentForm!: FormGroup;
  submitted = false;

  columns: any[] = [
    { id: 1, trainee_name: 'John Doe',marks:'' },
    { id: 2, trainee_name: 'Jane Smith',marks:''},
    { id: 3, trainee_name: 'Michael Johnson',marks:'' },
    { id: 4, trainee_name: 'Emily Davis' ,marks:''},
    { id: 5, trainee_name: 'David Wilson',marks:'' },
    { id: 6, trainee_name: 'Emma Brown',marks:'' },
    { id: 7, trainee_name: 'James Taylor',marks:'' },
    { id: 8, trainee_name: 'Olivia Martinez',marks:'' }
  ];
uploadedFiles: any[] = [];
 

constructor(private messageService: MessageService) { }



  onUpload(event:FileUploadEvent) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
      }  this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
      }
ngOnInit(): void {
    this.assessmentForm = new FormGroup({
      program: new FormControl('',Validators.required),
      batch: new FormControl('', Validators.required),
      phase: new FormControl('', Validators.required),
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      evaluationCriteria: new FormControl('', Validators.required),
      // module: new FormControl('', Validators.required),
      trainer: new FormControl('', Validators.required),
      submissionRequired: new FormControl('true', Validators.required),
      dueDate: new FormControl('', this.getDueDateValidators(true)),
      marks: new FormArray([]) 
    });
    this.columns.forEach(column => {
      (this.assessmentForm.get('marks') as FormArray).push(new FormControl(column.marks));
    });
    this.assessmentForm.get('submissionRequired')?.valueChanges.subscribe((value) => {
      const dueDateControl = this.assessmentForm.get('dueDate');
      if (dueDateControl) {
        dueDateControl.setValidators(this.getDueDateValidators(value === 'true'));
        dueDateControl.updateValueAndValidity();
      }
    });

  }

  


  updateMarks(): void {
    this.columns.forEach((column, index) => {
      const marksArray = this.assessmentForm.get('marks') as FormArray;
      marksArray.at(index).setValue(column.marks);
        return { id: column.id, marks: column.marks };
    });
   
    // console.log('Table Data:', updatedMarks);
  }


  getDueDateValidators(required: boolean): ValidatorFn[] {
    if (required) {
      return [Validators.required, this.futureDateValidator];
    } else {
      return [this.futureDateValidator];
    }
  }
  
 

  get ProgramControl(): FormControl {
    return this.assessmentForm.get('program') as FormControl;
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

  get trainerControl(): FormControl {
    return this.assessmentForm.get('trainer') as FormControl;
  }

  get dueDateControl(): FormControl {
    return this.assessmentForm.get('dueDate') as FormControl;
  }

 
onSubmit(): void {

    console.log(this.assessmentForm);
    
    if (this.assessmentForm.invalid) {

      this.validateAllFormFields(this.assessmentForm);
      console.log('Invalid Form');
      return;
    }

    const formData = this.assessmentForm.value;
    console.log('Form Data:', formData);

    if (formData.submissionRequired === 'false') {
      const marks = this.columns.map(column =>  column.marks);
      formData.marks = marks;
      
      console.log( 'Marks:', marks);
    }

    console.log('Final Form Data:', formData);
    this.updateMarks();
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
    const selectedDateTime = new Date(control.value);
    const now = new Date();

    if (selectedDateTime < now) {
      return { futureDate: true };
    }

    return null;
  }

  onProgramChange(selectedValue: string) {
    this.assessmentForm.get('program')?.setValue(selectedValue);
  }

  onBatchChange(selectedValue: string) {
    this.assessmentForm.get('batch')?.setValue(selectedValue);
  }
  onPhaseChange(event: any) {
    this.assessmentForm.get('phase')?.setValue(event);
  }

  onEvaluationCriteriaChange(event: any) {
    this.assessmentForm.get('evaluationCriteria')?.setValue(event);
  }

  onTrainerChange(event: any) {
    this.assessmentForm.get('trainer')?.setValue(event);
  }

  
}
