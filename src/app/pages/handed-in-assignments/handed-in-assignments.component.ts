import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-handed-in-assignments',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './handed-in-assignments.component.html',
  styleUrl: './handed-in-assignments.component.scss'
})
export class HandedInAssignmentsComponent {

  workForm: FormGroup;
  submitted: boolean = false;
  
  constructor(private fb: FormBuilder) {
    this.workForm = this.fb.group({
      link: ['', [Validators.required, Validators.pattern('https?://.+')]],
      comments: ['', Validators.required]
    });
  }
  onSubmit() {
    
    if (this.workForm.valid) {
      console.log(this.workForm.value);
    }
   
  }
  show(){
    this.submitted = true;

  }

  onCancel() {
    if (this.workForm.valid) {
      this.submitted = true;
    } else {
      this.submitted = false;
    }
  }
  
  
}
