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
import { ScheduleService } from '../../services/schedule.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-schedule',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf,RouterLink],
  templateUrl: './edit-schedule.component.html',
  styleUrl: './edit-schedule.component.scss',
})
export class EditScheduleComponent {

  idToFetch:any;

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

  constructor(private formBuilder: FormBuilder,private scheduleService:ScheduleService,private router:Router,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.idToFetch = id ? +id : null;
      // if (this.idToFetch) {
      //   this.fetchSchedule(this.idToFetch);
      // }
    });
    this.fetchSchedule();
  }
  public createScheduleForm = new FormGroup({
    program: new FormControl({ value: '', disabled: false},[Validators.required]),
    batch: new FormControl({ value: '', disabled: false},[Validators.required]),
    title: new FormControl({ value: '', disabled: false},[Validators.required]),
    date: new FormControl({ value: '', disabled: false},[Validators.required]),
    description: new FormControl({ value: '', disabled: false},[Validators.required]),
    startTime: new FormControl({ value: '', disabled: false},[Validators.required]),
    endTime: new FormControl({ value: '', disabled: false},[Validators.required]),
    module: new FormControl({ value: '', disabled: false},[Validators.required]),
    trainer: new FormControl({ value: '', disabled: false},[Validators.required]),
  });

  fetchSchedule(){
    this.scheduleService.fetchSession(this.idToFetch).subscribe(
      (response) => {
        console.log(response); 
        const fetchedStartDate = new Date(response.result.startTime).toISOString().split('T')[0];
        const fetchedStartTime = new Date(response.result.startTime).toTimeString().split(' ')[0].slice(0, 5);
        const fetchedEndTime = new Date(response.result.endTime).toTimeString().split(' ')[0].slice(0, 5);
        this.createScheduleForm.patchValue({
          program: 'Program 1', 
          batch: 'Batch 1',     
          title: response.result.sessionName,
          date: fetchedStartDate,   
          description: response.result.sessionDescription,
          startTime: fetchedStartTime,   
          endTime: fetchedEndTime,     
          module: 'Module 1',   
          trainer: 'Trainer 1'  
        });
      },
      (error) => {
        console.error('Error creating coupon:', error);
      }
    );
  }
  


  

  editPage(){
    this.createScheduleForm.enable();
  }



  onSubmit() {
    if (this.createScheduleForm.valid) {
      const startDateTime = new Date(`${this.createScheduleForm.get('date')?.value}T${this.createScheduleForm.get('startTime')?.value}`);
      const endDateTime = new Date(`${this.createScheduleForm.get('date')?.value}T${this.createScheduleForm.get('endTime')?.value}`);
      const formData = {
        SessionName: this.createScheduleForm.get('title')?.value,
        SessionDescription: this.createScheduleForm.get('description')?.value,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        trainerId:2,
        batchId:1,
        programId:3
      };
      this.scheduleService.updateSchedule(formData,this.idToFetch).subscribe(
        (response) => {
          console.log('Session updated successfully:', response);
          //this.router.navigate(['/schedule']);
        },
        (error) => {
          console.error('Error updating session:', error);
        }
      );  
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
