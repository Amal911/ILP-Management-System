import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { MainLayoutComponent } from '../../Layout/main-layout/main-layout.component';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MainLayoutComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  submitted: boolean = false;
  loginDisplay: boolean = false;
  isIframe = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private userService: UserService,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private router: Router,
    private authService: AuthService
  ) {
      this.msalService.handleRedirectObservable().subscribe((response: AuthenticationResult) => {
        if (response && response.accessToken) {
          console.log('Login successful', response);
          localStorage.setItem('msalKey', response.accessToken);
          
          // Pass the token to the auth service
          this.authService.getUserRole(response.accessToken).subscribe(
            (userData) => {
              console.log('User role', userData);
              localStorage.setItem("user",JSON.stringify(userData));
              let user = {name:userData.UserName,role:userData.roleName};
              console.log(user);
              
              this.authService.setCurrentUser(user);
              // Navigate based on the user role
              // if (userRole.roleName === 'Admin') {
              //   this.router.navigate(['/admin']);
              // } else if (userRole.roleName === 'Trainer') {
              //   this.router.navigate(['/trainer']);
              // } else if (userRole.roleName === 'Trainee') {
              //   this.router.navigate(['/trainee']);
              // }
            },
            (error) => {
              console.error('Error fetching user role', error);
            }
          );
        }
      });
    }

  ngOnInit(): void {

    // const userData = JSON.parse( localStorage.getItem("user") as string);
    // let user = {name:userData.UserName,role:userData.roleName}
    // this.userService.setCurrentUser(user);


    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required
      ])
    });

    this.setLoginDisplay();
    this.msalService.instance.enableAccountStorageEvents();

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount() {
    const activeAccount = this.msalService.instance.getActiveAccount();
    if (!activeAccount && this.msalService.instance.getAllAccounts().length > 0) {
      this.msalService.instance.setActiveAccount(this.msalService.instance.getAllAccounts()[0]);
    }
  }

  login() {
    this.msalService.loginRedirect(this.msalGuardConfig.authRequest as any);
  }

  logout() {
    this.msalService.logoutRedirect();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.submitted = true;
    }
  }

}
