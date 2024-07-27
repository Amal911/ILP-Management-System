import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { SelectDropdownComponent } from '../../components/select-dropdown/select-dropdown.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { Observable, forkJoin } from 'rxjs';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

interface Trainer {
  id: number;
  name: string;
}

@Component({
  selector: 'app-create-assessment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    TableModule,
    FileUploadModule,
    ButtonModule,
    ProgressBarModule,
    ToastModule,
    CommonModule,
    InputTextareaModule,
    DropdownComponent,
  ],
  templateUrl: './create-assessment.component.html',
  styleUrl: './create-assessment.component.scss',
  providers: [MessageService,DatePipe],
})
export class CreateAssessmentComponent implements OnInit {
  [x: string]: any;
  assessmentForm!: FormGroup;
  submitted = false;

  columns: any[] = [
    { id: 1, trainee_name: 'John Doe', marks: '' },
    { id: 2, trainee_name: 'DCruz', marks: '' },

  ];
  uploadedFiles: any[] = [];
  phases: any[] = [];
  assessmentTypes: any[] = [];
  trainers: string[] = [];
  batches: any[] = [];

  createAssessmentUrl = 'https://localhost:7009/Assessment/CreateAssessment';
  // marksUrl = 'https://localhost:7009/CompletedAssessments/Create';

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private userService: UserService,
    private datePipe: DatePipe
  ) {}

  onUpload(event: FileUploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }
  ngOnInit(): void {
    this.getPhases();
    this.getAssessmentTypes();
    this.getTrainers();
    this.getBatches();

    this.assessmentForm = new FormGroup({
      program: new FormControl('', Validators.required),
      batch: new FormControl('', Validators.required),
      phase: new FormControl('', Validators.required),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      evaluationCriteria: new FormControl('', Validators.required),
      // module: new FormControl('', Validators.required),
      trainer: new FormControl('', Validators.required),
      submissionRequired: new FormControl('true', Validators.required),
      dueDate: new FormControl('', this.getDueDateValidators(true)),
      marks: new FormArray([]),
      comments:new FormControl,
    });
    this.columns.forEach((column) => {
      (this.assessmentForm.get('marks') as FormArray).push(
        new FormControl(column.marks)
      );
    });
    this.assessmentForm
      .get('submissionRequired')
      ?.valueChanges.subscribe((value) => {
        const dueDateControl = this.assessmentForm.get('dueDate');
        if (dueDateControl) {
          dueDateControl.setValidators(
            this.getDueDateValidators(value === 'true')
          );
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
    if (this.assessmentForm.invalid) {
      this.validateAllFormFields(this.assessmentForm);
      return;
    }
  
    const formValue = this.assessmentForm.value;
    console.log(formValue);
  
    const formData = new FormData();
    this.appendFormData(formData, formValue.submissionRequired);
  
    if (formValue.submissionRequired === 'true') {
      this.http.post(this.createAssessmentUrl, formData).subscribe({
        next: (response) => this.handleSubmitSuccess(response),
        error: (error) => this.handleSubmitError(error)
      });
    } 
    else {
      formData.set('DueDateTime', '');
      formData.set('Document', '');
      formData.set('DocumentName', '');
      formData.set('DocumentContentType', '');
  
      const marks = this.columns.map(column => ({
        assessmentId: '',
        traineeId: column.id,
        score: column.marks
      }));      
      formData.append('marks', JSON.stringify(marks));
        
      this.http.post(this.createAssessmentUrl, formData,).subscribe({
        next: (response) => this.handleSubmitSuccess(response),
        error: (error) => this.handleSubmitError(error)
      });
    }
  }
  
  private appendFormData(formData: FormData, isSubmitable: string): void {
    const formValue = this.assessmentForm.value;
  
    formData.set('BatchId', this.getBatchId(formValue.batch).toString());
    formData.set('PhaseId', this.getPhaseId(formValue.phase).toString());
    formData.set('AssessmentTitle', formValue.title);
    formData.set('Description', formValue.comments);
    formData.set('IsSubmitable', isSubmitable);
    formData.set('AssessmentTypeID', this.getAssessmentTypeId(formValue.evaluationCriteria).toString());
    formData.set('DueDateTime', formValue.dueDate + 'T00:00:00Z');
    formData.set('UserId', '1');
  
    if (isSubmitable === 'true' && this.uploadedFiles.length > 0) {
      formData.append('Document', this.uploadedFiles[0]);
    }
  }
  

  private handleSubmitSuccess(response: any): void {
    console.log('Success:', response);
  }

  private handleSubmitError(error: any): void {
    console.error('Error:', error);
  }


  onCancel(): void {
    this.submitted = false;
    this.assessmentForm.reset();
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
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
  getPhases() {
    this.http
      .get('https://localhost:7009/Phase/GetAllPhases')
      .subscribe((data: any) => {
        this.phases = data;
      });
  }

  get phaseNames() {
    return this.phases.map((phase) => phase.phaseName);
  }
  getAssessmentTypes() {
    this.http
      .get('https://localhost:7009/AssessmentType/GetAllAssessmentTypes')
      .subscribe((data: any) => {
        this.assessmentTypes = data;
      });
  }

  get assessmentTypeNames() {
    return this.assessmentTypes.map((type) => type.assessmentTypeName);
  }

  getTrainers() {
    this.userService.getUsers().subscribe((users) => {
      this.userService.getRoles().subscribe((roles) => {
        const trainerRoleId = roles.find(
          (role) => role.roleName === 'Trainer'
        ).id;
        this.trainers = users
          .filter((user) => user.roleId === trainerRoleId)
          .map((trainer) => `${trainer.firstName} ${trainer.lastName}`);
      });
    });
  }

  getBatches() {
    this.http
      .get('https://localhost:7009/Batch/GetAllBatch')
      .subscribe((data: any) => {
        this.batches = data;
      });
  }

  get batchNames() {
    return this.batches.map((batch) => batch.batchName);
  }
  getBatchId(batchName: string): number {
    const batch = this.batches.find((b) => b.batchName === batchName);
    return batch ? batch.id : 0;
  }

  getPhaseId(phaseName: string): number {
    const phase = this.phases.find((p) => p.phaseName === phaseName);
    return phase ? phase.id : 0;
  }

  getAssessmentTypeId(assessmentTypeName: string): number {
    const type = this.assessmentTypes.find(
      (t) => t.assessmentTypeName === assessmentTypeName
    );
    return type ? type.id : 0;
  }

  OnTextAreaChange(){

  }
}
