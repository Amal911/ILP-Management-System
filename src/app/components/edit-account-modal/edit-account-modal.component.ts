import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-account-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-account-modal.component.html',
  styleUrl: './edit-account-modal.component.scss'
})
export class EditAccountModalComponent {

  editAccountForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    gender: new FormControl(''),
    mobile: new FormControl('')
  });

  fetchedData:any={
    name:"Lekshmi",
    email:"sample@example.com",
    role:"trainer",
    gender:"female",
    mobile:8000000000
  };

  ngOnInit(): void {
    
    this.editAccountForm = new FormGroup({
      name: new FormControl({ value: this.fetchedData.name, disabled: true }, [Validators.required, Validators.minLength(3)]),
      email: new FormControl({ value: this.fetchedData.email, disabled: true }, [Validators.required, Validators.email]),
      role: new FormControl({ value: this.fetchedData.role, disabled: true }, Validators.required),
      gender: new FormControl({ value: this.fetchedData.gender, disabled: true }, Validators.required),
      mobile: new FormControl({ value: this.fetchedData.mobile, disabled: true }, [Validators.required, Validators.pattern('^\\d{10}$')])
    });
  }

  editForm(){
    this.editAccountForm.enable();
  }



  onSubmit(): void {
    if (this.editAccountForm.valid) {
      console.log('Form Submitted', this.editAccountForm.value);
      this.editAccountForm.disable();
    }
  }
}
