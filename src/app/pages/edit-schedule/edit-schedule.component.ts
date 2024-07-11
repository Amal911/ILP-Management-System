import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-schedule',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './edit-schedule.component.html',
  styleUrl: './edit-schedule.component.scss',
})
export class EditScheduleComponent {
  batches = [
    {
      name: 'Batch 1',
    },
    {
      name: 'Batch 2',
    },
    {
      name: 'Batch 3',
    },
  ];

  programs = [
    {
      name: 'Program 1',
    },
    {
      name: 'Program 2',
    },
    {
      name: 'Program 3',
    },
  ];

  modules = [
    {
      name: 'Module 1',
    },
    {
      name: 'Module 2',
    },
    {
      name: 'Module 3',
    },
  ];

  trainers = [
    {
      name: 'Trainer 1',
    },
    {
      name: 'Trainer 2',
    },
    {
      name: 'Trainer 3',
    },
  ];
  public createScheduleForm = new FormGroup({
    program: new FormControl({ value: 'Program 1', disabled: true },[Validators.required]),
    batch: new FormControl({ value: 'Batch 1', disabled: true },[Validators.required]),
    title: new FormControl({ value: 'Introduction to OOPs', disabled: true },[Validators.required]),
    date: new FormControl({ value: '2025-12-12', disabled: true },[Validators.required]),
    description: new FormControl({ value: 'This is a session about basic OOPs concepts.', disabled: true },[Validators.required]),
    startTime: new FormControl({ value: '12:30', disabled: true },[Validators.required]),
    endTime: new FormControl({ value: '17:30', disabled: true },[Validators.required]),
    module: new FormControl({ value: 'Module 1', disabled: true },[Validators.required]),
    trainer: new FormControl({ value: 'Trainer 1', disabled: true },[Validators.required]),
  });

  editPage(){
    this.createScheduleForm.enable();
  }
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.createScheduleForm.valid) {
      // Process the form data (e.g., send it to backend)
      console.log(this.createScheduleForm.value);
      this.createScheduleForm.disable();
      // You can reset the form after successful submission
      // this.createScheduleForm.reset();
    } else {
      // Mark all fields as touched to display validation messages
      this.createScheduleForm.markAllAsTouched();
    }
  }
}
