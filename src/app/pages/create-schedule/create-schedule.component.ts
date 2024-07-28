import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownComponent } from "../../components/dropdown/dropdown.component";
import { ScheduleService } from '../../services/schedule.service';
import { timestamp } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { BatchService } from '../../services/API/batch.service';
import { SessionService } from '../../services/API/session.service';

@Component({
    selector: 'app-create-schedule',
    standalone: true,
    templateUrl: './create-schedule.component.html',
    styleUrl: './create-schedule.component.scss',
    imports: [FormsModule, ReactiveFormsModule, NgIf, DropdownComponent,RouterLink]
})
export class CreateScheduleComponent {

  batches:any=[];

  programs:any=[{
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


  constructor(private formBuilder: FormBuilder,private sessionService:SessionService,private router:Router,private batchService:BatchService) { }

  ngOnInit(): void {
    this.batchService.getProgram().subscribe(res=>{
      this.programs = res;
      console.log(this.programs);

    })
  }


  onSubmit() {
    console.log("adasd");

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
      console.log(formData);


      this.sessionService.createSchedule(formData).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/schedule']);
        },
        (error) => {
          console.error('Error creating coupon:', error);
        }
      );
      console.log(this.createScheduleForm.value);
      // You can reset the form after successful submission
      this.createScheduleForm.reset();
    } else {
      // Mark all fields as touched to display validation messages
      this.createScheduleForm.markAllAsTouched();
    }
  }

  getBatch(event:any){
    console.log(event);
    this.batchService.getBatchByProgram(event).subscribe(res=>{
      console.log(res);
      this.batches = res;

    })
  }
}
