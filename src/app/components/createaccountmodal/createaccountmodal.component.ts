import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { HollowButtonComponent } from '../hollow-button/hollow-button.component';
import { UserService } from '../../services/API/user.service';

@Component({
  selector: 'app-createaccountmodal',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, ButtonComponent, HollowButtonComponent],
  templateUrl: './createaccountmodal.component.html',
  styleUrl: './createaccountmodal.component.scss'
})
export class CreateaccountmodalComponent {
  constructor(private userApi:UserService){

  }

  createAccountForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    emailId: new FormControl(''),
    roleId: new FormControl(''),
    gender: new FormControl<number>(0),
    mobileNumber: new FormControl('')
  });

  ngOnInit(): void {
    
    this.createAccountForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      roleId: new FormControl('', Validators.required),
      gender: new FormControl(0,Validators.required),
      mobileNumber: new FormControl('', [Validators.required, Validators.pattern('^\\d{10}$')])
    });
  }

  onSubmit(): void {
    
    if (this.createAccountForm.valid) {
      console.log('Form Submitted', this.createAccountForm.value);
      let user =  this.createAccountForm.value;
      user.gender = Number(user.gender);
      this.userApi.addNewUser(this.createAccountForm.value).subscribe(res=>{
        console.log(res);
        
      })
    }
  }

}

