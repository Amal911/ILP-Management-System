import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-schedule',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgIf],
  templateUrl: './create-schedule.component.html',
  styleUrl: './create-schedule.component.scss'
})
export class CreateScheduleComponent {

  batches=[{
    name:"Batch 1"
  },{
    name:"Batch 2"
  },{
    name:"Batch 3"
  }];

  programs=[{
    name:"Program 1"
  },{
    name:"Program 2"
  },{
    name:"Program 3"
  }];

  modules=[{
    name:"Module 1"
  },{
    name:"Module 2"
  },{
    name:"Module 3"
  }];

  trainers=[{
    name:"Trainer 1"
  },{
    name:"Trainer 2"
  },{
    name:"Trainer 3"
  }];

  public createScheduleForm= new FormGroup({
    program: new FormControl('',[Validators.required]),
    batch: new FormControl('',[Validators.required]),
    title: new FormControl('',[Validators.required]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('',[Validators.required]),
    startTime: new FormControl('',[Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    module: new FormControl('', [Validators.required]),
    trainer: new FormControl('', [Validators.required])
  });


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }


  onSubmit() {
    if (this.createScheduleForm.valid) {
      // Process the form data (e.g., send it to backend)
      console.log(this.createScheduleForm.value);
      // You can reset the form after successful submission
      this.createScheduleForm.reset();
    } else {
      // Mark all fields as touched to display validation messages
      this.createScheduleForm.markAllAsTouched();
    }
  }
}
