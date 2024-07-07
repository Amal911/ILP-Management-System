import { Component, Input, OnInit } from '@angular/core';
import { UploadButtonComponent } from "../upload-button/upload-button.component";
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
    selector: 'app-schedule-operations',
    standalone: true,
    templateUrl: './schedule-operations.component.html',
    styleUrl: './schedule-operations.component.scss',
    imports: [UploadButtonComponent,FormsModule,ReactiveFormsModule,CommonModule]
})


export class ScheduleOperationsComponent implements OnInit {

  @Input() scheduleOperation:string = '';
  @Input() showDropdownButtons: boolean = true;
  scheduleForm!: FormGroup ;
  isFormSubmitted=false ;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.scheduleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      date: ['', [Validators.required, this.dateNotInPast]],
      description: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(500)]],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }
  dateNotInPast(control: AbstractControl): { [key: string]: boolean } | null {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00.000
    const selectedDate = new Date(control.value);
    selectedDate.setHours(0, 0, 0, 0); // Set time to 00:00:00.000

    if (selectedDate.getTime() < today.getTime()) {
      return { 'dateNotInPast': true };
    }
    return null;
  }
  // timeOutsideOfficeHours(control: AbstractControl): { [key: string]: boolean } | null {
  //   const time = control.value;
  //   const [hours, minutes] = time.split(':').map(Number);
  //   if (hours < 9 || (hours === 18 && minutes > 0) || hours > 18) {
  //     return { 'timeOutsideOfficeHours': true };
  //   }
  //   return null;
  // }
  onSubmit(){
   const isFormValid=this.scheduleForm.valid;
   this.isFormSubmitted=true;

}}


