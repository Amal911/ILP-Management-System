import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-createaccountmodal',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './createaccountmodal.component.html',
  styleUrl: './createaccountmodal.component.scss'
})
export class CreateaccountmodalComponent {

  createAccountForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    gender: new FormControl(''),
    mobile: new FormControl('')
  });

  ngOnInit(): void {
    
    this.createAccountForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      mobile: new FormControl('', [Validators.required, Validators.pattern('^\\d{10}$')])
    });
  }

  onSubmit(): void {
    if (this.createAccountForm.valid) {
      console.log('Form Submitted', this.createAccountForm.value);
    }
  }

}

