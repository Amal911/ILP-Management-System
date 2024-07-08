import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-evaluate-assessments',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgIf],
  templateUrl: './evaluate-assessments.component.html',
  styleUrl: './evaluate-assessments.component.scss'
})
export class EvaluateAssessmentsComponent {

  links:string[]=["https://google.com","https://wikipedia.com","https://google.com"];
  docs:string[]=["Screenshot.png","Document.pdf"];
  totalMarks:number=100;
  assignmentTitle:string="OOPS Assignment";
  submittedBy:string="Kailas Nadh J";
  submittedOn:string="27 June 2024";
  submittedAt:string="17:30";

  public evaluateAssessmentForm= new FormGroup({
    score: new FormControl('',[Validators.required]),
    comments: new FormControl('')
  });


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }


  onSubmit() {
    if (this.evaluateAssessmentForm.valid) {
      console.log(this.evaluateAssessmentForm.value);
      this.evaluateAssessmentForm.reset();
    } else {
      // Mark all fields as touched to display validation messages
      this.evaluateAssessmentForm.markAllAsTouched();
    }
  }
}
